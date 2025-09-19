        document.addEventListener('DOMContentLoaded', async function () {
            const classSelect = document.getElementById("classSelect");
            const subjectSelect = document.getElementById("subjectSelect");
            const chapterSelect = document.getElementById("chapterSelect");
            const startBtn = document.getElementById("startBtn");
            const loader = document.getElementById("loader");
            const selectionContainer = document.getElementById("selectionContainer");

            const scriptUrl = 'https://script.google.com/macros/s/AKfycbywh0JQwRLJNzQIDJzfF0FWX-krbQGgQjRVfSNSQ0jdqJnV6rNVGDKSNawTle-9-lzhvg/exec'; // Replace with your deployed Apps Script URL

            try {
                let formData;
                const storedData = sessionStorage.getItem('quizFormData');
                if (storedData) {
                    formData = JSON.parse(storedData);
                } else {
                    const response = await fetch(scriptUrl);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    formData = await response.json();
                    sessionStorage.setItem('quizFormData', JSON.stringify(formData));
                }

                loader.style.display = "none";
                selectionContainer.style.display = "block";

                // Populate Class dropdown
                formData.forEach(cls => {
                    const opt = document.createElement("option");
                    opt.value = cls.class;
                    opt.textContent = cls.class;
                    classSelect.appendChild(opt);
                });

                let selectedClassData = null;

                classSelect.addEventListener("change", function () {
                    const clsName = classSelect.value;
                    selectedClassData = formData.find(item => item.class === clsName);

                    subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
                    chapterSelect.innerHTML = '<option value="">-- Select Chapter --</option>';
                    subjectSelect.disabled = true;
                    chapterSelect.disabled = true;
                    startBtn.disabled = true;

                    if (selectedClassData) {
                        Object.keys(selectedClassData.subjects).forEach(sub => {
                            const opt = document.createElement("option");
                            opt.value = sub;
                            opt.textContent = sub;
                            subjectSelect.appendChild(opt);
                        });
                        subjectSelect.disabled = false;
                    }
                });

                subjectSelect.addEventListener("change", function () {
                    const subName = subjectSelect.value;
                    chapterSelect.innerHTML = '<option value="">-- Select Chapter --</option>';
                    chapterSelect.disabled = true;
                    startBtn.disabled = true;

                    if (selectedClassData && selectedClassData.subjects[subName]) {
                        selectedClassData.subjects[subName].forEach(ch => {
                            const opt = document.createElement("option");
                            opt.value = ch;
                            opt.textContent = ch;
                            chapterSelect.appendChild(opt);
                        });
                        chapterSelect.disabled = false;
                    }
                });

                chapterSelect.addEventListener("change", function () {
                    startBtn.disabled = !chapterSelect.value;
                });

                startBtn.addEventListener("click", function () {
                    const cls = classSelect.value.trim();
                    const sub = subjectSelect.value.trim();
                    const ch = chapterSelect.value.trim();
                    if (!cls || !sub || !ch) { alert("Please select all fields."); return; }

                    const subjectParam = cls.replace("Class", "cl").replace(/\s/g, '')
                        + sub.replace(/\s/g, '')
                        + ch.replace(/\s/g, '');
                    window.location.href = `quizPage.html?subject=${encodeURIComponent(subjectParam)}`;
                });

            } catch (error) {
                loader.style.display = "none";
                console.error("Error fetching data:", error);
                alert("Failed to load quiz selection data. Please try again.");
            }
        });
