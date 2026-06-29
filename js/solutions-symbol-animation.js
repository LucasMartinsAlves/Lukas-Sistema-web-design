export function initSolutionsSymbolAnimation(gsap, ScrollTrigger) {
  const transition = document.querySelector('.solutions-transition');
  const stage = document.querySelector('.solutions-symbol-stage');
  const automationSection = document.querySelector('.solution-automation');
  const logo = document.querySelector('.solutions-symbol-logo');
  const shapes = document.querySelector('.solutions-symbol-shapes');

  const symbol = document.querySelector('.solutions-symbol');
  const topShape = document.querySelector('.solutions-symbol-shape-top');
  const bottomShape = document.querySelector('.solutions-symbol-shape-bottom');

  const figure1Shapes = document.querySelector('.solutions-symbol-shapes-figure-1');
  const figure1Parts = gsap.utils.toArray('.figure-1-part');

  const figure2Shapes = document.querySelector('.solutions-symbol-shapes-figure-2');
  const figure2Parts = gsap.utils.toArray('.figure-2-part');

  const figure3Shapes = document.querySelector('.solutions-symbol-shapes-figure-3');
  const figure3Circle = document.querySelector('.figure-3-circle');
  const figure3Parts = gsap.utils.toArray('.figure-3-part');

  if (
    !transition ||
    !stage ||
    !automationSection ||
    !symbol ||
    !logo ||
    !shapes ||
    !topShape ||
    !bottomShape ||
    !figure1Shapes ||
    !figure1Parts.length ||
    !figure2Shapes ||
    !figure2Parts.length ||
    !figure3Shapes ||
    !figure3Circle ||
    !figure3Parts.length
  ) {
    return;
  }

  const squareTopPoints = `
  150,300
  300,300
  450,300
  450,150
  300,150
  150,150
`;

  const squareBottomPoints = `
  150,450
  300,450
  450,450
  450,300
  300,300
  150,300
`;

  const figure0FinalPoints = {
    top: `
    -60.762,126.184
    300.638,300
    675,300
    675,111.184
    332.526,-75
    -60.762,-75
  `,
    bottom: `
    -75,487.684
    267.924,675
    649.649,675
    649.649,476.184
    300,300
    -75,300
  `,
  };

  const figure1SquarePoints = [
    '150,150 150,225 150,300 225,300 300,300 300,150',
    '300,150 300,225 300,300 375,300 450,300 450,150',
    '300,300 300,375 300,450 375,450 450,450 450,300',
    '150,300 150,375 150,450 225,450 300,450 300,300',
  ];

  const figure1FinalPoints = [
    '-74.63,112.315 -74.63,300 113.056,300 300,113.056 300,-74.629 112.315,-74.629',
    '300.371,111.944 300.371,299.629 488.056,299.629 675,112.685 675,-75 487.315,-75',
    '300.371,487.315 300.371,675 488.056,675 675,488.056 675,300.371 487.315,300.371',
    '-75,486.573 -75,674.259 112.685,674.259 299.629,487.315 299.629,299.629 111.944,299.629',
  ];

  const figure2FinalPoints = {
    top: '0.296,0 600,0 600,191.407 300.445,299.852 299.852,299.852 0.296,191.407',
    bottom: '0,300.148 599.704,300.148 599.704,491.556 300.148,600 299.555,600 0,491.556',
  };

  const figure2SquarePoints = {
    top: '150,150 300,150 450,150 450,300 300,300 150,300',
    bottom: '150,300 300,300 450,300 450,450 300,450 150,450',
  };

  const figure3SemiCirclePaths = {
    top: 'M-75,-75 H675 C675,132.107 507.107,300 300,300 C92.893,300 -75,132.107 -75,-75 Z',
    bottom: 'M-75,300 H675 C675,507.107 507.107,675 300,675 C92.893,675 -75,507.107 -75,300 Z',
  };

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.solutions-transition',
      start: 'top top',
      end: '+=450%',
      scrub: true,
    },
  });

  gsap.set(symbol, {
    transformOrigin: 'center',
  });

  function getLogoY() {
    if (window.matchMedia('(min-width: 75rem)').matches) {
      return -window.innerHeight * 0.85;
    }

    if (window.matchMedia('(min-width: 48rem)').matches) {
      return -window.innerHeight * 0.20;
    }

    if (window.matchMedia('(min-width: 22rem)').matches) {
      return -window.innerHeight * 0.15;
    }

    return window.innerHeight * 0.10;
  }

  gsap.set(logo, {
    y: getLogoY,
    transformOrigin: 'center',
  });

  function lockSymbolStage() {
    const transitionRect = transition.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    stage.classList.add('is-locked');
    stage.style.top = `${stageRect.top - transitionRect.top}px`;
  }

  function unlockSymbolStage() {
    stage.classList.remove('is-locked');
    stage.style.top = '';
  }

  ScrollTrigger.create({
    trigger: automationSection,
    start: 'center center',
    end: 'bottom top',
    onEnter: lockSymbolStage,
    onEnterBack: lockSymbolStage,
    onLeaveBack: unlockSymbolStage,
  });

  timeline
    // Logo diminui e desaparece.
    .to(logo, {
      y: 0,
      scale: 0.85,
      opacity: 0,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.out',
    })
    // As duas metades aparecem juntas, formando o quadrado.
    .fromTo(
      shapes,
      {
        scale: 0.65,
        opacity: 0,
        transformOrigin: 'center',
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
      },
      '<0.35',
    )

    // Separação mais longa e ampla.
    .to(topShape, {
      x: 240,
      scaleX: 1.6,
      transformOrigin: 'center bottom',
      duration: 1.6,
      ease: 'power2.inOut',
    })
    .to(bottomShape, {
      x: -240,
      scaleX: 1.6,
      transformOrigin: 'center top',
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')

    // A figura começa a crescer durante a separação.
    .to(symbol, {
      scale: 2.5,
      transformOrigin: 'center',
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')

    // Morph superior mais rápido.
    .to(topShape, {
      x: 0,
      scaleX: 1,
      attr: {
        points: figure0FinalPoints.top,
      },
      duration: 1,
      ease: 'power1.inOut',
    })

    // Morph inferior.
    .to(bottomShape, {
      x: 0,
      scaleX: 1,
      attr: {
        points: figure0FinalPoints.bottom,
      },
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    // Ajuste final de escala.
    .to(symbol, {
      scale: 2.8,
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    .to({}, {
      duration: 0.8,
    })

    // Figura atual volta para o quadrado.
    .to(topShape, {
      attr: {
        points: squareTopPoints,
      },
      duration: 1,
      ease: 'power1.inOut',
    })
    .to(bottomShape, {
      attr: {
        points: squareBottomPoints,
      },
      duration: 1,
      ease: 'power1.inOut',
    }, '<')
    .to(symbol, {
      scale: 1,
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    // Troca invisível: 2 partes somem, 4 partes aparecem como quadrado.
    .set(figure1Parts, {
      attr: (index) => ({
        points: figure1SquarePoints[index],
      }),
    })
    .set(figure1Shapes, {
      scale: 1,
      transformOrigin: 'center',
      opacity: 1,
    })
    .set(shapes, {
      opacity: 0,
    })

    // As 4 partes se separam e expandem.
    .to(figure1Parts[0], {
      x: -180,
      y: -180,
      scale: 3,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(figure1Parts[1], {
      x: 180,
      y: -180,
      scale: 3,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')
    .to(figure1Parts[2], {
      x: 180,
      y: 180,
      scale: 3,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')
    .to(figure1Parts[3], {
      x: -180,
      y: 180,
      scale: 3,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')
    .to(figure1Shapes, {
      scale: 1,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')

    // Morph para a Figura-1 final.
    .to(figure1Parts, {
      x: 0,
      y: 0,
      scale: 1,
      attr: (index) => ({
        points: figure1FinalPoints[index],
      }),
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to(symbol, {
      scale: 2.8,
      duration: 0.8,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: 0.8,
    })

    // Figura-1 volta para o quadrado.
    .to(figure1Parts, {
      attr: (index) => ({
        points: figure1SquarePoints[index],
      }),
      duration: 1,
      ease: 'power1.inOut',
    })
    .to(symbol, {
      scale: 1,
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    // Troca invisível: 4 partes somem, 2 partes aparecem como quadrado.
    .set(figure2Parts[0], {
      attr: {
        points: figure2SquarePoints.top,
      },
    })
    .set(figure2Parts[1], {
      attr: {
        points: figure2SquarePoints.bottom,
      },
    })
    .set(figure2Shapes, {
      opacity: 1,
    })
    .set(figure1Shapes, {
      opacity: 0,
    })

    // Os 2 retângulos se separam e expandem.
    .to(figure2Parts[0], {
      y: -180,
      scaleX: 3.2,
      scaleY: 2.6,
      transformOrigin: 'center bottom',
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(figure2Parts[1], {
      y: 180,
      scaleX: 3.2,
      scaleY: 2.6,
      transformOrigin: 'center top',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')

    // Morph para a Figura-2 final.
    .to(figure2Parts[0], {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      attr: {
        points: figure2FinalPoints.top,
      },
      duration: 0.5,
      ease: 'power1.inOut',
    })
    .to(figure2Parts[1], {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      attr: {
        points: figure2FinalPoints.bottom,
      },
      duration: 0.5,
      ease: 'power1.inOut',
    }, '<')
    .to(symbol, {
      scale: 2.8,
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: 0.8,
    })

    // Figura-2 volta para o quadrado.
    .to(figure2Parts[0], {
      attr: {
        points: figure2SquarePoints.top,
      },
      duration: 1,
      ease: 'power1.inOut',
    })
    .to(figure2Parts[1], {
      attr: {
        points: figure2SquarePoints.bottom,
      },
      duration: 1,
      ease: 'power1.inOut',
    }, '<')
    .to(symbol, {
      scale: 1,
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    // A elipse nasce no centro do quadrado e cresce até 750x750.
    .set(figure3Circle, {
      attr: {
        r: 0,
      },
      opacity: 1,
    })
    .set(figure3Parts, {
      opacity: 0,
    })
    .set(figure3Shapes, {
      opacity: 1,
    })
    .to(figure3Circle, {
      attr: {
        r: 375,
      },
      duration: 0.6,
      ease: 'power2.inOut',
    })
    .to(figure2Shapes, {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    })

    // O círculo se divide em dois semicírculos reais.
    .set(figure3Parts[0], {
      attr: {
        d: figure3SemiCirclePaths.top,
      },
      rotation: 180,
      opacity: 1,
      svgOrigin: '300 112.5',
    })
    .set(figure3Parts[1], {
      attr: {
        d: figure3SemiCirclePaths.bottom,
      },
      opacity: 1,
    })
    .set(figure3Circle, {
      opacity: 0,
    })

    // O semicírculo de cima gira no próprio eixo.
    .to(figure3Parts[0], {
      rotation: 0,
      svgOrigin: '300 112.5',
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to(symbol, {
      scale: 2.8,
      duration: 1.4,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: 1,
    });
}
