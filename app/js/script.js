document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.getElementById("experienceArrow");
    const experienceList = document.querySelector(".experience-list");
    let isRotated = false;

    if (arrow && experienceList) {
        arrow.addEventListener("click", () => {
            // Показати або приховати список досвіду
            experienceList.classList.toggle("show");

            // Обертання стрілки
            isRotated = !isRotated;
            arrow.style.transform = isRotated ? "rotate(90deg)" : "rotate(0deg)";
            arrow.style.transition = "transform 0.3s";
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.getElementById("educationArrow");
    const educationList = document.querySelector(".education-list");
    let isRotated = false; // Змінна для відстеження стану обертання

    if (arrow && educationList) {
        arrow.addEventListener("click", () => {
            // Показ або приховування списку освіти з анімацією
            educationList.classList.toggle("show");

            // Обертання стрілки
            isRotated = !isRotated;
            arrow.style.transform = isRotated ? "rotate(90deg)" : "rotate(0deg)";
            arrow.style.transition = "transform 0.3s"; // Додаємо плавність обертання
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const skillArrow = document.getElementById("skillsArrow");
    const skillList = document.querySelector(".skill-list");
    let isRotated = false; // Змінна для відстеження стану обертання стрілки

    if (skillArrow && skillList) {
        skillArrow.addEventListener("click", () => {
            const isHidden = skillList.style.display === "none" || skillList.style.display === "";
            skillList.style.display = isHidden ? "block" : "none";

            // Обертання стрілки
            isRotated = !isRotated;
            skillArrow.style.transform = isRotated ? "rotate(90deg)" : "rotate(0deg)";
            skillArrow.style.transition = "transform 0.3s"; // Додаємо плавність

            // Анімація для прогрес-барів
            if (isHidden) {
                const progressBars = document.querySelectorAll(".progress-bar");
                progressBars.forEach((progressBar) => {
                    animateProgress(progressBar);
                });
            }
        });
    }

    function animateProgress(progressBar) {
        let startValue = 0;
        const endValue = progressBar.getAttribute("value");
        const slider = progressBar.nextElementSibling; 
        const secondSlider = slider.nextElementSibling; 

        const interval = setInterval(() => {
            if (startValue >= endValue) {
                clearInterval(interval); 
            } else {
                startValue += 1;
                progressBar.value = startValue;

                const percentage = startValue / progressBar.max;
                slider.style.left = `calc(${percentage * 100}% - 40px)`;
                secondSlider.style.width = `${percentage * 50}%`;
            }
        }, 5); 
    }
});

