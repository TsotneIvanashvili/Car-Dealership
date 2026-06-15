import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

const StaggeredMenu = ({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/logo.svg",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#00E676",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];

      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }

      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;

      gsap.set([panel, ...preLayers], {
        xPercent: offscreen,
        opacity: 1,
      });

      if (preContainer) {
        gsap.set(preContainer, {
          xPercent: 0,
          opacity: 1,
        });
      }

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

    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel")
    );

    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    );

    const socialTitle = panel.querySelector(".sm-socials-title");

    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link")
    );

    const offscreen = position === "left" ? -100 : 100;

    if (itemEls.length) {
      gsap.set(itemEls, {
        yPercent: 140,
        rotate: 10,
      });
    }

    if (numberEls.length) {
      gsap.set(numberEls, {
        "--sm-num-opacity": 0,
      });
    }

    if (socialTitle) {
      gsap.set(socialTitle, {
        opacity: 0,
      });
    }

    if (socialLinks.length) {
      gsap.set(socialLinks, {
        y: 25,
        opacity: 0,
      });
    }

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

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      {
        xPercent: 0,
        duration: panelDuration,
        ease: "power4.out",
      },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: {
              each: 0.08,
              from: "start",
            },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          socialsStart
        );
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: {
              each: 0.08,
              from: "start",
            },
            onComplete: () => {
              gsap.set(socialLinks, {
                clearProps: "opacity",
              });
            },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;

    busyRef.current = true;

    const tl = buildOpenTimeline();

    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });

      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) return;

    const all = [...layers, panel];
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
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

        if (itemEls.length) {
          gsap.set(itemEls, {
            yPercent: 140,
            rotate: 10,
          });
        }

        if (numberEls.length) {
          gsap.set(numberEls, {
            "--sm-num-opacity": 0,
          });
        }

        if (socialTitle) {
          gsap.set(socialTitle, {
            opacity: 0,
          });
        }

        if (socialLinks.length) {
          gsap.set(socialLinks, {
            y: 25,
            opacity: 0,
          });
        }

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
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  useEffect(() => {
    if (!toggleBtnRef.current) return;

    if (changeMenuColorOnOpen) {
      gsap.set(toggleBtnRef.current, {
        color: openRef.current ? openMenuButtonColor : menuButtonColor,
      });
    } else {
      gsap.set(toggleBtnRef.current, {
        color: menuButtonColor,
      });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;

    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq = [currentLabel];

    let last = currentLabel;

    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }

    if (last !== targetLabel) {
      seq.push(targetLabel);
    }

    seq.push(targetLabel);

    setTextLines(seq);

    gsap.set(inner, {
      yPercent: 0,
    });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

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
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);

    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

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
      className={
        (className ? className + " " : "") +
        "staggered-menu-wrapper" +
        (isFixed ? " fixed-wrapper" : "")
      }
      style={accentColor ? { "--sm-accent": accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw =
            colors && colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];

          const arr = [...raw];

          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }

          return arr.map((color, index) => (
            <div
              key={index}
              className="sm-prelayer"
              style={{ background: color }}
            />
          ));
        })()}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          <img
            src={logoUrl}
            alt="Logo"
            className="sm-logo-img"
            draggable={false}
            width={110}
            height={24}
          />
        </div>

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
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

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <li className="sm-panel-itemWrap" key={item.label + index}>
                  <a
                    className="sm-panel-item"
                    href={item.link}
                    aria-label={item.ariaLabel}
                    data-index={index + 1}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>

              <ul className="sm-socials-list" role="list">
                {socialItems.map((social, index) => (
                  <li key={social.label + index} className="sm-socials-item">
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {social.label}
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