export function initSolutionsSymbolAnimation(gsap, ScrollTrigger) {
  const transition = document.querySelector('.solutions-transition');
  const stage = document.querySelector('.solutions-symbol-stage');
  const symbolPosition = document.querySelector('.solutions-symbol-position');
  const automationSection = document.querySelector('.solution-automation');
  const introAnchor = document.querySelector('.solutions-symbol-anchor-intro');
  const managementAnchor = document.querySelector('.solutions-symbol-anchor-management');
  const webAnchor = document.querySelector('.solutions-symbol-anchor-web');
  const mobileAnchor = document.querySelector('.solutions-symbol-anchor-mobile');
  const automationAnchor = document.querySelector('.solutions-symbol-anchor-automation');
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
    !symbolPosition ||
    !automationSection ||
    !managementAnchor ||
    !webAnchor ||
    !mobileAnchor ||
    !automationAnchor ||
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

  const baseSymbolScale = 1;
  const finalSymbolScale = 2.8;
  const firstSplitOffset = 240;
  const splitOffset = 180;
  const firstSplitSymbolScale = 2.5;
  const firstSplitScaleX = 1.6;
  const figure1PartScale = 3;
  const figure2PartScaleX = 3.2;
  const figure2PartScaleY = 2.6;
  const circleFinalRadius = 375;
  const pauseDuration = 0.8;
  const morphDuration = 1;
  const mobileTimelineHeightFactor = 0.84;

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

  function getSymbolTimelineEnd() {
    if (window.matchMedia('(min-width: 75rem)').matches) {
      return '+=450%';
    }

    return `+=${transition.offsetHeight * mobileTimelineHeightFactor}`;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.solutions-transition',
      start: 'top top',
      end: () => getSymbolTimelineEnd(),
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.set(symbol, {
    transformOrigin: 'center',
  });

  function getFallbackLogoY() {
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

  function getElementCenter(element) {
    const rect = element.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function getSymbolScaleRatio() {
    const symbolRect = symbol.getBoundingClientRect();
    const viewBoxWidth = symbol.viewBox.baseVal.width;

    if (!symbolRect.width || !viewBoxWidth) {
      return 1;
    }

    return viewBoxWidth / symbolRect.width;
  }

  function getViewportAnchorOffsetY(anchor, element) {
    const anchorCenter = getElementCenter(anchor);
    const elementCenter = getElementCenter(element);

    return anchorCenter.y - elementCenter.y;
  }

  function getSvgAnchorOffsetY(anchor, element = symbol) {
    return getViewportAnchorOffsetY(anchor, element) * getSymbolScaleRatio();
  }

  function getInitialLogoOffsetY() {
    if (!introAnchor) {
      return getFallbackLogoY();
    }

    return getSvgAnchorOffsetY(introAnchor);
  }

  function getSolutionAnchorOffsetY(anchor) {
    if (!anchor) {
      return 0;
    }

    const section = anchor.closest('.solution');

    if (!section) {
      return 0;
    }

    return anchor.offsetTop - section.clientHeight / 2;
  }

  function setInitialLogoPosition() {
    gsap.set(logo, {
      y: getInitialLogoOffsetY,
      transformOrigin: 'center',
    });
  }

  setInitialLogoPosition();
  ScrollTrigger.addEventListener('refreshInit', setInitialLogoPosition);

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

  // Fase 1: logo para sistema de gestao.
  function animateIntroToManagement() {
    timeline
      .to(logo, {
      y: 0,
      scale: 0.85,
      opacity: 0,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.out',
    })
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

    .to(symbolPosition, {
      y: () => getSolutionAnchorOffsetY(managementAnchor),
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')

    .to(topShape, {
      x: firstSplitOffset,
      scaleX: firstSplitScaleX,
      transformOrigin: 'center bottom',
      duration: 1.6,
      ease: 'power2.inOut',
    })
    .to(bottomShape, {
      x: -firstSplitOffset,
      scaleX: firstSplitScaleX,
      transformOrigin: 'center top',
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')

    .to(symbol, {
      scale: firstSplitSymbolScale,
      transformOrigin: 'center',
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')

    .to(topShape, {
      x: 0,
      scaleX: 1,
      attr: {
        points: figure0FinalPoints.top,
      },
      duration: 1,
      ease: 'power1.inOut',
    })

    .to(bottomShape, {
      x: 0,
      scaleX: 1,
      attr: {
        points: figure0FinalPoints.bottom,
      },
      duration: 1,
      ease: 'power1.inOut',
    }, '<')

    .to(symbol, {
      scale: finalSymbolScale,
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')

    .to({}, {
      duration: pauseDuration,
    });
  }

  animateIntroToManagement();

  // Fase 2: sistema de gestao para sistema web.
  function animateManagementToWeb() {
    timeline
      .to(topShape, {
      attr: {
        points: squareTopPoints,
      },
      duration: morphDuration,
      ease: 'power1.inOut',
    })
    .to(bottomShape, {
      attr: {
        points: squareBottomPoints,
      },
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')
    .to(symbolPosition, {
      y: () => getSolutionAnchorOffsetY(webAnchor),
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')
    .to(symbol, {
      scale: baseSymbolScale,
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')

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

    .to(figure1Parts[0], {
      x: -splitOffset,
      y: -splitOffset,
      scale: figure1PartScale,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(figure1Parts[1], {
      x: splitOffset,
      y: -splitOffset,
      scale: figure1PartScale,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')
    .to(figure1Parts[2], {
      x: splitOffset,
      y: splitOffset,
      scale: figure1PartScale,
      transformOrigin: 'center',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')
    .to(figure1Parts[3], {
      x: -splitOffset,
      y: splitOffset,
      scale: figure1PartScale,
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
      scale: finalSymbolScale,
      duration: pauseDuration,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: pauseDuration,
    });
  }

  animateManagementToWeb();

  // Fase 3: sistema web para sistema mobile.
  function animateWebToMobile() {
    timeline
      .to(figure1Parts, {
      attr: (index) => ({
        points: figure1SquarePoints[index],
      }),
      duration: morphDuration,
      ease: 'power1.inOut',
    })
    .to(symbol, {
      scale: baseSymbolScale,
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')
    .to(symbolPosition, {
      y: () => getSolutionAnchorOffsetY(mobileAnchor),
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')

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

    .to(figure2Parts[0], {
      y: -splitOffset,
      scaleX: figure2PartScaleX,
      scaleY: figure2PartScaleY,
      transformOrigin: 'center bottom',
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(figure2Parts[1], {
      y: splitOffset,
      scaleX: figure2PartScaleX,
      scaleY: figure2PartScaleY,
      transformOrigin: 'center top',
      duration: 1,
      ease: 'power2.inOut',
    }, '<')

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
      scale: finalSymbolScale,
      duration: 0.4,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: pauseDuration,
    });
  }

  animateWebToMobile();

  // Fase 4: sistema mobile para automacao.
  function animateMobileToAutomation() {
    timeline
      .to(figure2Parts[0], {
      attr: {
        points: figure2SquarePoints.top,
      },
      duration: morphDuration,
      ease: 'power1.inOut',
    })
    .to(figure2Parts[1], {
      attr: {
        points: figure2SquarePoints.bottom,
      },
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')
    .to(symbol, {
      scale: baseSymbolScale,
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')

    .to(symbolPosition, {
      y: () => getSolutionAnchorOffsetY(automationAnchor),
      duration: morphDuration,
      ease: 'power1.inOut',
    }, '<')
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
        r: circleFinalRadius,
      },
      duration: 0.6,
      ease: 'power2.inOut',
    })
    .to(figure2Shapes, {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    })

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

    .to(figure3Parts[0], {
      rotation: 0,
      svgOrigin: '300 112.5',
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to(symbol, {
      scale: finalSymbolScale,
      duration: 1.4,
      ease: 'power1.inOut',
    })
    .to({}, {
      duration: 1,
    });
  }

  animateMobileToAutomation();
}
