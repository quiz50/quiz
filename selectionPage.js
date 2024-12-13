document.addEventListener('DOMContentLoaded', function() {
    const selectionForm = document.getElementById("selection-form");
    const classSelect = document.getElementById("class");
    const subjectSelect = document.getElementById("subject");
    const chapterSelect = document.getElementById("chapter");
    const loader = document.getElementById("loader");
    const selectionContainer = document.querySelector('.selection-container');

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywh0JQwRLJNzQIDJzfF0FWX-krbQGgQjRVfSNSQ0jdqJnV6rNVGDKSNawTle-9-lzhvg/exec';

    fetch(scriptUrl)
        .then(response => response.json())
        .then(formData => {
            loader.style.display = "none"; // Hide loader
            selectionContainer.style.display = "flex"; // Show form
            // Populate class dropdown
            const uniqueClasses = [...new Set(formData.map(item => item.class))];
            uniqueClasses.forEach(className => {
                const option = document.createElement("option");
                option.value = className;
                option.textContent = className;
                classSelect.appendChild(option);
            });

            classSelect.addEventListener("change", function() {
                const selectedClass = classSelect.value;
                const classData = formData.find(item => item.class === selectedClass);

                subjectSelect.innerHTML = '<option value="">Select Subject</option>';
                chapterSelect.innerHTML = '<option value="">Select Chapter</option>';

                if (classData) {
                    classData.subject.forEach(subject => {
                        const option = document.createElement("option");
                        option.value = `sub${subject}`; // Add "sub" prefix
                        option.textContent = subject;
                        subjectSelect.appendChild(option);
                    });

                    classData.chapter.forEach(chapter => {
                        let chapterValue;
                        if (chapter.toLowerCase().includes("all")) {
                            chapterValue = "chAll";
                        } else {
                            chapterValue = "ch" + chapter.replace(/\D/g, '');
                        }
                        const option = document.createElement("option");
                        option.value = chapterValue; // Use chapterValue
                        option.textContent = chapter;
                        chapterSelect.appendChild(option);
                    });
                }
            });

            // Form submission
            selectionForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const selectedClass = classSelect.value.trim();
                const selectedSubject = subjectSelect.value.trim();
                const selectedChapter = chapterSelect.value.trim();

                if (selectedClass && selectedSubject && selectedChapter) {
                    // const subjectParam = selectedClass.replace(/\s/g, '') + selectedSubject + selectedChapter;
                    const subjectParam = selectedClass.replace("Class", "cl").replace(/\s/g, '') + selectedSubject + selectedChapter;
                    console.log(subjectParam);
                    window.location.href = `quizPage.html?subject=${encodeURIComponent(subjectParam)}`;
                } else {
                    alert("Please select all the fields.");
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
