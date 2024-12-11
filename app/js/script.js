document.addEventListener("DOMContentLoaded", () => {
    const elements = [
        { arrowId: "experienceArrow", listClass: ".experience-list" },
        { arrowId: "educationArrow", listClass: ".education-list" }
    ];

    elements.forEach(({ arrowId, listClass }) => {
        const arrow = document.getElementById(arrowId);
        const list = document.querySelector(listClass);
        let isRotated = false;

        if (arrow && list) {
            arrow.addEventListener("click", () => {
                
                list.classList.toggle("show");

                
                isRotated = !isRotated;
                arrow.style.transform = isRotated ? "rotate(90deg)" : "rotate(0deg)";
                arrow.style.transition = "transform 0.3s";
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const skillArrow = document.getElementById("skillsArrow");
    const skillList = document.querySelector(".skill-list");
    let isRotated = false;

    if (skillArrow && skillList) {
        skillArrow.addEventListener("click", () => {
            const isHidden = skillList.style.display === "none" || skillList.style.display === "";
            skillList.style.display = isHidden ? "block" : "none";

            
            isRotated = !isRotated;
            skillArrow.style.transform = isRotated ? "rotate(90deg)" : "rotate(0deg)";
            skillArrow.style.transition = "transform 0.3s"; 

            
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

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(data => {
          console.log(data)
          const jobListContainer = document.getElementById('jobList');
          const jobListHTML = data.jobList.map(edu => `
                     <li>
                        <span class="h_content">${edu.position}</span>
                        <h4>${edu.company} <span class="date">${edu.years}</span></h4>
                        <p>${edu.description}</p>
                    </li>
          `).join('');
          jobListContainer.innerHTML = jobListHTML;
          
          const educationContainer = document.getElementById('educationList');
          const educationHTML = data.education.map(edu => `
                     <li>
                        <span class="h_content_ed">${edu.degree}</span>
                        <h4><span class="date">${edu.years}</span> ${edu.institution}</h4>
                        <p>${edu.description}</p>
                    </li>
          `).join('');
          educationContainer.innerHTML = educationHTML;
          })
          .catch(error => console.error('Error fetching JSON :) :', error));
});
