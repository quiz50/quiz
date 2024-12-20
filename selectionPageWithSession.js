document.addEventListener('DOMContentLoaded', async function () {
    const selectionForm = document.getElementById("selection-form");
    const classSelect = document.getElementById("class");
    const subjectSelect = document.getElementById("subject");
    const chapterSelect = document.getElementById("chapter");
    const loader = document.getElementById("loader");
    const selectionContainer = document.querySelector('.selection-container');

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywh0JQwRLJNzQIDJzfF0FWX-krbQGgQjRVfSNSQ0jdqJnV6rNVGDKSNawTle-9-lzhvg/exec';

    try {
        let formData;

        // Check if data is already stored in sessionStorage
        const storedData = sessionStorage.getItem('quizFormData');
        if (storedData) {
            formData = JSON.parse(storedData); // Use stored data
        } else {
            // Fetch data if not already in sessionStorage
            const response = await fetch(scriptUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            formData = await response.json();

            // Store the fetched data in sessionStorage
            sessionStorage.setItem('quizFormData', JSON.stringify(formData));
        }

        loader.style.display = "none"; // Hide loader
        selectionContainer.style.display = "flex"; // Show form

        if (!formData || formData.length === 0) {
            alert("No data available. Please try again later.");
            return;
        }

        // Populate class dropdown
        const uniqueClasses = [...new Set(formData.map(item => item.class))];
        uniqueClasses.forEach(className => {
            const option = document.createElement("option");
            option.value = className;
            option.textContent = className;
            classSelect.appendChild(option);
        });

        classSelect.addEventListener("change", function () {
            const selectedClass = classSelect.value;
            const classData = formData.find(item => item.class === selectedClass);

            subjectSelect.innerHTML = '<option value="">Select Subject</option>';
            chapterSelect.innerHTML = '<option value="">Select Chapter</option>';

            if (classData) {
                // Populate subjects
                classData.subject.forEach(subject => {
                    const option = document.createElement("option");
                    option.value = `sub${subject}`; // Add "sub" prefix
                    option.textContent = subject;
                    subjectSelect.appendChild(option);
                });

                // Populate chapters
                classData.chapter.forEach(chapter => {
                    const chapterValue = chapter.toLowerCase().includes("all")
                        ? "chAll"
                        : "ch" + chapter.replace(/\D/g, '');
                    const option = document.createElement("option");
                    option.value = chapterValue;
                    option.textContent = chapter;
                    chapterSelect.appendChild(option);
                });
            }
        });

        // Form submission
        selectionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const selectedClass = classSelect.value.trim();
            const selectedSubject = subjectSelect.value.trim();
            const selectedChapter = chapterSelect.value.trim();

            if (selectedClass && selectedSubject && selectedChapter) {
                const subjectParam = selectedClass.replace("Class", "cl").replace(/\s/g, '') + selectedSubject + selectedChapter;
                console.log(subjectParam);
                window.location.href = `quizPage.html?subject=${encodeURIComponent(subjectParam)}`;
            } else {
                alert("Please select all the fields.");
            }
        });
    } catch (error) {
        loader.style.display = "none"; // Hide loader
        alert("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
    }
});
