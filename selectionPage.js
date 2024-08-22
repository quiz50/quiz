document.addEventListener("DOMContentLoaded", function () {
    const selectionForm = document.getElementById("selection-form");
    const classSelect = document.getElementById("class");
    const subjectSelect = document.getElementById("subject");
    const chapterSelect = document.getElementById("chapter");

    const classData = {
        cl1: {
            subjects: ['Math', 'English','GK' ,'Science'],
            chapters: ['All Chapters']
        },
        cl2: {
            subjects: ['Math', 'English','GK' ,'Science'],
            chapters: ['All Chapters']
        },
        cl3: {
            subjects: ['Math', 'English','GK' ,'Science'],
            chapters: ['All Chapters']
        },
        cl4: {
            subjects: ['Math', 'English','GK' ,'Science'],
            chapters: 'All Chapters']
        },
        cl5: {
            subjects: ['Math', 'English','GK' ,'Science','Hindi'],
            chapters: ['All Chapters']
        },
        cl6: {
            subjects: ['Math', 'English','GK' ,'Science','Hindi','English Grammar','Hindi Grammar'],
            chapters: ['All Chapters']
        },
        cl7: {
            subjects: ['Math', 'English','GK' ,'Science','Hindi','English Grammar','Hindi Grammar'],
            chapters: ['All Chapters']
        },
        cl8: {
           subjects: ['Math', 'English','GK' ,'Science','Hindi','English Grammar','Hindi Grammar'],
            chapters: ['All Chapters']
        },
        cl9: {
            subjects: ['Biology', 'Physics', 'Chemistry','Math','History', 'Political Science', 'Geography', 'Economics','Hindi','Python'],
            chapters: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7']
        },
        cl10: {
            subjects: ['Science','Math','English','History', 'Political Science', 'Geography', 'Economics','Hindi','Python'],
            chapters: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7','Chapter 8','Chapter 9','Chapter 10','Chapter 11']
        },
        cl11: {
            subjects: ['Math', 'Physics', 'Chemistry','Biology', 'Physical Education','Python','C'],
            chapters: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7']
        },
        cl12: {
            subjects: ['Math', 'Physics', 'Chemistry'','Biology', 'Physical Education','Python','C'],
            chapters: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7']
        },
        clBTech: {
            subjects: ['C', 'TOC', 'CPP', 'OS', 'DBMS', 'COA', 'Digital Electronic', 'JAVA'],
            chapters: ['All Chapters']
        }
    };

    // Populate subjects and chapters based on selected class
    classSelect.addEventListener("change", function () {
        const selectedClass = classSelect.value;
        const subjects = classData[selectedClass]?.subjects || [];
        const chapters = classData[selectedClass]?.chapters || [];

        // Clear existing options
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        chapterSelect.innerHTML = '<option value="">Select Chapter</option>';

        // Populate subjects
        subjects.forEach(subject => {
            const option = document.createElement("option");
            option.value = `sub${subject}`;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });

        // Populate chapters
        chapters.forEach(chapter => {
            let chapterValue;
            if (chapter.includes("All")) {
                chapterValue = `chAll`;
            } else {
                chapterValue = `ch${chapter.replace(/\D/g, '')}`;
            }
            const option = document.createElement("option");
            option.value = chapterValue;
            option.textContent = chapter;
            chapterSelect.appendChild(option);
        });
    });

    // Form submission handler
    if (selectionForm) {
        selectionForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get the selected values
            const selectedClass = classSelect.value;
            const selectedSubject = subjectSelect.value.split(' ').join('');
            const selectedChapter = chapterSelect.value;

            // // Debugging statements
            // console.log('Selected Class:', selectedClass);
            // console.log('Selected Subject:', selectedSubject);
            // console.log('Selected Chapter:', selectedChapter);

            // Check if all fields are selected
            if (selectedClass && selectedSubject && selectedChapter) {
                // Concatenate the values without spaces
                const subjectParam = selectedClass + selectedSubject + selectedChapter;

                // Redirect to quizPage.html with the correct URL
                window.location.href = `quizPage.html?subject=${subjectParam}`;
            } else {
                // Show an alert if any field is not selected
                alert("Please select all the fields.");
                // Ensure redirection is not occurring
                // console.log('Redirection prevented.');
            }
        });
    }
});
