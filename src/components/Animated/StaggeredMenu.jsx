import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

const StaggeredMenu = ({
    
  position = "right",
  colors = ["#00E676", "#0B0F0E"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = "",
  logoUrl = "/Main/logo.png",
  menuButtonColor = "#FBF7F0",
  openMenuButtonColor = "#FBF7F0",
  accentColor = "#00E676",
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
    const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll(".sm-prelayer"))
        : [];

      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;

      gsap.set([panel, ...preLayers], {
        xPercent: offscreen,
        opacity: 1,
      });

      gsap.set(plusH, {
        transformOrigin: "50% 50%",
        rotate: 0,
      });

      gsap.set(plusV, {
        transformOrigin: "50% 50%",
        rotate: 90,
      });

      gsap.set(icon, {
        rotate: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(textInner, {
        yPercent: 0,
      });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, {
          color: menuButtonColor,
        });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const offscreen = position === "left" ? -100 : 100;

    gsap.set(itemEls, {
      yPercent: 140,
      rotate: 10,
    });

    gsap.set(numberEls, {
      "--sm-num-opacity": 0,
    });

    if (socialTitle) {
      gsap.set(socialTitle, {
        opacity: 0,
      });
    }

    gsap.set(socialLinks, {
      y: 25,
      opacity: 0,
    });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        index * 0.07
      );
    });

    const panelStart = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      {
        xPercent: 0,
        duration: 0.65,
        ease: "power4.out",
      },
      panelStart
    );

    tl.to(
      itemEls,
      {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      panelStart + 0.12
    );

    tl.to(
      numberEls,
      {
        duration: 0.6,
        ease: "power2.out",
        "--sm-num-opacity": 1,
        stagger: 0.08,
      },
      panelStart + 0.22
    );

    if (socialTitle) {
      tl.to(
        socialTitle,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        panelStart + 0.35
      );
    }

    tl.to(
      socialLinks,
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
      },
      panelStart + 0.4
    );

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;

    busyRef.current = true;

    const tl = buildOpenTimeline();

    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });

    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) return;

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        );
        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item"
          )
        );
        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link")
        );

        gsap.set(itemEls, {
          yPercent: 140,
          rotate: 10,
        });

        gsap.set(numberEls, {
          "--sm-num-opacity": 0,
        });

        if (socialTitle) {
          gsap.set(socialTitle, {
            opacity: 0,
          });
        }

        gsap.set(socialLinks, {
          y: 25,
          opacity: 0,
        });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;

    if (!icon) return;

    spinTweenRef.current?.kill();

    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? "power4.out" : "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;

      if (!btn) return;

      colorTweenRef.current?.kill();

      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(btn, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, {
          color: menuButtonColor,
        });
      }
    },
    [
      changeMenuColorOnOpen,
      menuButtonColor,
      openMenuButtonColor,
    ]
  );

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;

    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const sequence = [currentLabel, targetLabel, currentLabel, targetLabel];

    setTextLines(sequence);

    gsap.set(inner, {
      yPercent: 0,
    });

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -75,
      duration: 0.7,
      ease: "power4.out",
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);

    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [onMenuClose, playClose, animateIcon, animateColor, animateText]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;

    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    onMenuOpen,
    onMenuClose,
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
  className={`${className} staggered-menu-wrapper ${
    isFixed ? "fixed-wrapper" : ""
  } ${scrolled ? "scrolled" : ""}`}
      style={{ "--sm-accent": accentColor }}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.map((color, index) => (
          <div
            key={index}
            className="sm-prelayer"
            style={{ background: color }}
          />
        ))}
      </div>

      <header className="staggered-menu-header">
        <Link to="/" className="sm-logo" onClick={closeMenu}>
          <img src={logoUrl} alt="Logo" className="sm-logo-img" />
        </Link>

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((line, index) => (
                <span className="sm-toggle-line" key={index}>
                  {line}
                </span>
              ))}
            </span>
          </span>

          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside ref={panelRef} className="staggered-menu-panel">
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.map((item, index) => {
              const isExternal = item.link.startsWith("http");

              return (
                <li className="sm-panel-itemWrap" key={item.label}>
                  {isExternal ? (
                    <a
                      href={item.link}
                      className="sm-panel-item"
                      aria-label={item.ariaLabel}
                      data-index={index + 1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sm-panel-itemLabel">
                        {item.label}
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      className="sm-panel-item"
                      aria-label={item.ariaLabel}
                      data-index={index + 1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemLabel">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title text-white">Socials</h3>
              <ul className="sm-socials-list">
                {socialItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.link}
                      className="sm-socials-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;