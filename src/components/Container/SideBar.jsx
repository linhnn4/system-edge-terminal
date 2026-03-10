import IconDown from "@/assets/svgs/chevron-down.svg?react";
import IconCollapse from "@/assets/svgs/chevron-left-double.svg?react";
import IconExpand from "@/assets/svgs/chevron-right-double.svg?react";
import ROUTERS_CONFIG from "@/utils/routers";
import { Tooltip } from "antd";
import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TRANSITION = "0.25s cubic-bezier(0.2, 0, 0, 1)";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.5rem;
  margin: var(--spacing-sm, 0.375rem) 0 var(--spacing-sm, 0.375rem)
    var(--spacing-sm, 0.375rem);
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: var(--radius-xl, 0.75rem);
  border: 1px solid var(--Colors-Border-border-secondary, #22262f);
  background: rgba(30, 41, 59, 0.5);
  box-shadow: 0 1px 2px 0
    var(--Colors-Effects-Shadows-shadow-xs, rgba(255, 255, 255, 0));
  overflow: hidden;
  transition: width ${TRANSITION};
  .sidebar-header {
    padding: 0.5rem 0.75rem;
    width: 100%;
    border-bottom: 1px solid #22262f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: padding ${TRANSITION};
    .workspace {
      width: 100%;
      cursor: pointer;
      display: flex;
      height: 3.5rem;
      padding: 0.5rem 0.75rem;
      align-items: center;
      gap: 0.5rem;
      align-self: stretch;
      border-radius: 0.375rem;
      color: var(--color-white-solid, #fff);
      text-overflow: ellipsis;
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-style: normal;
      font-weight: var(--font-weight-600, 600);
      line-height: var(--line-height-20, 1.25rem);
      transition:
        background 0.2s ease,
        padding ${TRANSITION};
      &:hover {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
      }
      .name-wrapper {
        flex-grow: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        overflow: hidden;
        max-width: 100%;
        opacity: 1;
        transition:
          max-width ${TRANSITION},
          opacity ${TRANSITION};
        .name {
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: calc(100% - 1.75rem);
        }
      }
      .icon {
        display: flex;
        width: 2rem;
        height: 2rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
        border-radius: 0.5rem;
        flex-shrink: 0;
        background: linear-gradient(
          135deg,
          var(--color-azure-600, #448bff) 0%,
          var(--color-blue-500, #4f46e5) 100%
        );
        box-shadow:
          0 10px 15px -3px rgba(59, 130, 246, 0.2),
          0 4px 6px -4px rgba(59, 130, 246, 0.2);
      }
      .collapse-sidebar {
        display: flex;
        width: 2rem;
        height: 2rem;
        padding: var(--spacing-sm, 0.375rem);
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        opacity: 1;
        transition: opacity ${TRANSITION};
        cursor: pointer;
        &:hover {
          border-radius: var(--radius-sm, 0.375rem);
          background: var(--color-grey-500, #64748b);
        }
      }
    }
    .expand-sidebar {
      position: absolute;
      left: 4.65rem;
      display: flex;
      width: 1.5rem;
      height: 2rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0 var(--radius-sm, 0.375rem) var(--radius-sm, 0.375rem) 0;
      border-top: 1px solid var(--Colors-Border-border-secondary, #22262f);
      border-right: 1px solid var(--Colors-Border-border-secondary, #22262f);
      border-bottom: 1px solid var(--Colors-Border-border-secondary, #22262f);
      background: rgba(30, 41, 59, 0.5);
      box-shadow: 0 1px 2px 0
        var(--Colors-Effects-Shadows-shadow-xs, rgba(255, 255, 255, 0));
      opacity: 0;
      pointer-events: none;
      cursor: pointer;
      transition: opacity ${TRANSITION};
      &:hover {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
      }
    }
  }
  .sidebar-content {
    width: 100%;
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: padding ${TRANSITION};
    .sidebar-item {
      display: flex;
      height: 2.5rem;
      padding: var(--spacing-md, 0.5rem) var(--spacing-xl, 1rem);
      align-items: center;
      gap: 0.5rem;
      align-self: stretch;
      border-radius: var(--radius-sm, 0.375rem);
      color: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-style: normal;
      font-weight: var(--font-weight-600, 600);
      line-height: var(--line-height-20, 1.25rem);
      cursor: pointer;
      transition:
        background 0.2s ease,
        color 0.2s ease,
        padding ${TRANSITION},
        justify-content ${TRANSITION};
      svg {
        flex-shrink: 0;
        path {
          stroke: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));
          transition: stroke 0.2s ease;
        }
      }
      span.item-label {
        overflow: hidden;
        white-space: nowrap;
        max-width: 20rem;
        opacity: 1;
        transition:
          max-width ${TRANSITION},
          opacity ${TRANSITION};
      }
      &:hover,
      &.active {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
        color: var(--color-white-solid, #fff);
        svg {
          path {
            stroke: var(--color-white-solid, #fff);
          }
        }
      }
      .sidebar-item-arrow {
        margin-left: auto;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        overflow: hidden;
        max-width: 1.5rem;
        opacity: 1;
        transition:
          transform 0.2s ease,
          max-width ${TRANSITION},
          opacity ${TRANSITION};
        &.expanded {
          transform: rotate(180deg);
        }
      }
    }
    .sidebar-children {
      overflow: hidden;
      transition:
        max-height 0.25s ease,
        opacity 0.25s ease;
      max-height: 0;
      opacity: 0;
      margin-left: 26px;
      border-left: 1px solid var(--color-grey-500, #64748b);
      &.open {
        max-height: 31.25rem;
        opacity: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .sidebar-item {
        margin-left: 0.5rem;
        svg {
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
  &.collapsed {
    width: 4.25rem;
    .sidebar-header {
      padding: 0.5rem 0;
      justify-content: center;
      .workspace {
        padding: 0;
        justify-content: center;
        position: relative;
        width: 3.5rem;
        .name-wrapper {
          max-width: 0;
          opacity: 0;
          display: none;
        }
        .collapse-sidebar {
          opacity: 0;
          pointer-events: none;
          display: none;
        }
      }
      .expand-sidebar {
        opacity: 1;
        pointer-events: auto;
      }
    }
    .sidebar-content {
      .sidebar-item {
        justify-content: center;
        padding: 0;
        gap: 0;
        span.item-label {
          max-width: 0;
          opacity: 0;
          display: none;
        }
        .sidebar-item-arrow {
          max-width: 0;
          opacity: 0;
          display: none;
        }
      }
      .sidebar-children {
        max-height: 0 !important;
        opacity: 0 !important;
        pointer-events: none;
        border: none;
        margin: 0;
      }
    }
  }
`;

const FlyoutMenu = styled.div`
  position: fixed;
  left: 4.65rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: rgba(30, 41, 59, 0.97);
  border: 1px solid var(--Colors-Border-border-secondary, #22262f);
  border-radius: var(--radius-xl, 0.75rem);
  padding: 0.5rem;
  min-width: 13rem;
  backdrop-filter: blur(8px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.4),
    0 2px 4px -2px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity ${TRANSITION},
    transform ${TRANSITION};
  transform: translateX(-0.5rem);
  &.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }
  .flyout-header {
    padding: 0.375rem var(--spacing-xl, 1rem);
    color: var(--color-grey-400, #94a3b8);
    font-family: var(--font-family-Font-1, Inter);
    font-size: var(--font-size-12, 0.75rem);
    font-weight: var(--font-weight-600, 600);
    line-height: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .flyout-item {
    display: flex;
    height: 2.5rem;
    padding: var(--spacing-md, 0.5rem) var(--spacing-xl, 1rem);
    align-items: center;
    gap: 0.5rem;
    border-radius: var(--radius-sm, 0.375rem);
    color: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));
    font-family: var(--font-family-Font-1, Inter);
    font-size: var(--font-size-14, 0.875rem);
    font-weight: var(--font-weight-600, 600);
    line-height: var(--line-height-20, 1.25rem);
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease;
    svg {
      flex-shrink: 0;
      path {
        stroke: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));
        transition: stroke 0.2s ease;
      }
    }
    &:hover,
    &.active {
      background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
      color: var(--color-white-solid, #fff);
      svg path {
        stroke: var(--color-white-solid, #fff);
      }
    }
  }
`;

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const closeTimerRef = useRef(null);

  const activeKey = useMemo(() => {
    for (const router of ROUTERS_CONFIG) {
      if (router.path === location.pathname) return router.key;
      if (router.childrens) {
        const child = router.childrens.find(
          (c) => c.path === location.pathname,
        );
        if (child) return child.key;
      }
    }
    return null;
  }, [location.pathname]);

  const toggleExpand = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const isParentActive = (router) => {
    if (router.path === location.pathname) return true;
    return (
      isCollapsed && router.childrens?.some((c) => c.path === location.pathname)
    );
  };

  const handleItemMouseEnter = (key, e) => {
    clearTimeout(closeTimerRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyoutTop(rect.top);
    setHoveredKey(key);
  };

  const handleItemMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setHoveredKey(null), 80);
  };

  const handleFlyoutMouseEnter = () => {
    clearTimeout(closeTimerRef.current);
  };

  const handleFlyoutMouseLeave = () => {
    setHoveredKey(null);
  };

  const hoveredRouter =
    ROUTERS_CONFIG.find((r) => r.key === hoveredKey) ?? null;

  return (
    <>
      <Wrapper className={isCollapsed ? "collapsed" : ""}>
        <div className="sidebar-header">
          <div className="workspace">
            <div className="icon">D</div>
            <div className="name-wrapper">
              <div className="name">Demo-001</div>
              <IconDown fontSize="1.25rem" />
            </div>
            {!isCollapsed && (
              <div
                className="collapse-sidebar"
                onClick={() => setIsCollapsed(true)}
              >
                <IconCollapse fontSize="1.25rem" />
              </div>
            )}
          </div>
          <div className="expand-sidebar" onClick={() => setIsCollapsed(false)}>
            <IconExpand fontSize="1.25rem" />
          </div>
        </div>
        <div className="sidebar-content">
          {ROUTERS_CONFIG.map((router) => (
            <div
              key={router.key}
              onMouseEnter={
                router.childrens
                  ? (e) => isCollapsed && handleItemMouseEnter(router.key, e)
                  : undefined
              }
              onMouseLeave={
                router.childrens
                  ? () => isCollapsed && handleItemMouseLeave()
                  : undefined
              }
            >
              <Tooltip
                title={isCollapsed && !router.childrens ? router.name : ""}
                placement="right"
                mouseEnterDelay={0.5}
              >
                <div
                  className={`sidebar-item ${
                    router.childrens
                      ? isParentActive(router)
                        ? "active"
                        : ""
                      : activeKey === router.key
                        ? "active"
                        : ""
                  }`}
                  onClick={() => {
                    if (router.childrens) {
                      toggleExpand(router.key);
                    } else {
                      setExpandedKeys([]);
                      navigate(router.path);
                    }
                  }}
                >
                  <router.icon fontSize="1.25rem" />
                  <span className="item-label">{router.name}</span>
                  {router.childrens && (
                    <span
                      className={`sidebar-item-arrow ${
                        expandedKeys.includes(router.key) ? "expanded" : ""
                      }`}
                    >
                      <IconDown fontSize="1rem" />
                    </span>
                  )}
                </div>
              </Tooltip>
              {router.childrens && (
                <div
                  className={`sidebar-children ${
                    expandedKeys.includes(router.key) ? "open" : ""
                  }`}
                >
                  {router.childrens.map((child) => (
                    <div
                      key={child.key}
                      className={`sidebar-item ${activeKey === child.key ? "active" : ""}`}
                      onClick={() => navigate(child.path)}
                    >
                      <child.icon fontSize="1.25rem" />
                      <span className="item-label">{child.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Wrapper>
      {isCollapsed && hoveredRouter?.childrens && (
        <FlyoutMenu
          className={hoveredKey ? "visible" : ""}
          style={{ top: flyoutTop }}
          onMouseEnter={handleFlyoutMouseEnter}
          onMouseLeave={handleFlyoutMouseLeave}
        >
          {hoveredRouter.childrens.map((child) => (
            <div
              key={child.key}
              className={`flyout-item ${activeKey === child.key ? "active" : ""}`}
              onClick={() => {
                setHoveredKey(null);
                navigate(child.path);
              }}
            >
              <child.icon fontSize="1.25rem" />
              {child.name}
            </div>
          ))}
        </FlyoutMenu>
      )}
    </>
  );
};

export default SideBar;
