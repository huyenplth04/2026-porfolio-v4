function Home() {
  useEffect(() => {
    const animateTextElements = (selector, splitBy = "letters") => {
      const textContainers = document.querySelectorAll(selector);
      const animatedElements = [];

      textContainers.forEach((textContainer) => {
        let elements = [];
        let elementType = "";

        if (splitBy === "words") {
          elements = textContainer.textContent.trim().split(/\s+/);
          elementType = "word";
        } else {
          const words = textContainer.textContent.trim().split(/\s+/);
          words.forEach((word, wordIndex) => {
            for (let i = 0; i < word.length; i += 1) {
              elements.push(word[i]);
            }
            if (wordIndex < words.length - 1) {
              elements.push(" ");
            }
          });
          elementType = "letter";
        }

        textContainer.textContent = "";

        elements.forEach((element, index) => {
          if (splitBy === "letters" && element === " ") {
            textContainer.appendChild(document.createTextNode(" "));
            return;
          }

          const elementSpan = document.createElement("span");
          elementSpan.classList.add(elementType);
          elementSpan.textContent = element;
          textContainer.appendChild(elementSpan);

          if (splitBy === "words" && index < elements.length - 1) {
            textContainer.appendChild(document.createTextNode(" "));
          }

          animatedElements.push({
            element: elementSpan,
            originalX: 0,
            originalY: 0,
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
          });
        });
      });

      const cachePositions = () => {
        animatedElements.forEach((entry) => {
          const rect = entry.element.getBoundingClientRect();
          entry.originalX = rect.left + rect.width / 2;
          entry.originalY = rect.top + rect.height / 2;
          entry.currentX = 0;
          entry.currentY = 0;
          entry.targetX = 0;
          entry.targetY = 0;
        });
      };

      const onMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 150;
        const maxDisplacement = 300;

        animatedElements.forEach((entry) => {
          const dx = entry.originalX - mouseX;
          const dy = entry.originalY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          if (distance < radius) {
            const force = (1 - distance / radius) * maxDisplacement;
            entry.targetX = (dx / distance) * force;
            entry.targetY = (dy / distance) * force;
          } else {
            entry.targetX = 0;
            entry.targetY = 0;
          }
        });
      };

      let frameId = 0;
      const animate = () => {
        const lerpFactor = 0.1;
        animatedElements.forEach((entry) => {
          entry.currentX += (entry.targetX - entry.currentX) * lerpFactor;
          entry.currentY += (entry.targetY - entry.currentY) * lerpFactor;
          entry.element.style.transform = `translate(${entry.currentX}px, ${entry.currentY}px)`;
        });
        frameId = requestAnimationFrame(animate);
      };

      cachePositions();
      window.addEventListener("resize", cachePositions, { passive: true });
      document.addEventListener("mousemove", onMouseMove);
      frameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", cachePositions);
        document.removeEventListener("mousemove", onMouseMove);
      };
    };

    const cleanup = animateTextElements(".landing-text", "letters");
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // return (
  //   <>
  //     {/* Start Main */}
  //     <div className="container">
  //       <div className="hero-frame">
  //         <div className="hero-line">
  //           <div className="name">
  //             Huyen <br /> Pham
  //           </div>
  //           <p>
  //             a <br></br> digital designer
  //           </p>
  //         </div>
  //         <div className="landing-text">HUYEN</div>
  //       </div>
  //     </div>
  //     {/* End Main */}
  //   </>
  // );
}

export default Home;
