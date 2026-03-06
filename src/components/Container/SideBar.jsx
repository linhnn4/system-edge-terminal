import IconDown from "@/assets/svgs/chevron-down.svg?react";
import IconCollapse from "@/assets/svgs/chevron-left-double.svg?react";
import IconExpand from "@/assets/svgs/chevron-right-double.svg?react";
import ROUTERS_CONFIG from "@/utils/routers";
import { Menu } from "antd";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.5rem;
  max-width: 17.5rem;
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
  transition: width 0.25s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;

  .sidebar-header {
    padding: 0.5rem 0.75rem;
    width: 100%;
    border-bottom: 1px solid #22262f;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      transition: background 0.2s ease;
      &:hover {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
      }
      .name-wrapper {
        flex-grow: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .name {
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
        &:hover {
          border-radius: var(--radius-sm, 0.375rem);
          background: var(--color-grey-500, #64748b);
        }
      }
    }
  }

  .sidebar-content {
    width: 100%;
    padding: 0.5rem 0.75rem;
    overflow-y: auto;
    flex: 1;

    /* Override antd Menu to match custom styles */
    .ant-menu {
      background: transparent;
      border-inline-end: none !important;
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-weight: var(--font-weight-600, 600);
      line-height: var(--line-height-20, 1.25rem);
      gap: 0.25rem;
      display: flex;
      flex-direction: column;
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      height: 2.5rem;
      padding: var(--spacing-md, 0.5rem) var(--spacing-xl, 1rem) !important;
      margin: 0 !important;
      border-radius: var(--radius-sm, 0.375rem);
      color: var(--color-grey-400, #94a3b8) !important;
      transition:
        background 0.2s ease,
        color 0.2s ease;
      svg path {
        stroke: var(--color-grey-400, #94a3b8);
        transition: stroke 0.2s ease;
      }
      &:hover,
      &.ant-menu-item-selected,
      &.ant-menu-submenu-selected > .ant-menu-submenu-title {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5)) !important;
        color: var(--color-white-solid, #fff) !important;
        svg path {
          stroke: var(--color-white-solid, #fff);
        }
      }
    }
    .ant-menu-item-selected {
      background: var(--color-grey-70050, rgba(51, 65, 85, 0.5)) !important;
      color: var(--color-white-solid, #fff) !important;
      svg path {
        stroke: var(--color-white-solid, #fff);
      }
    }
    .ant-menu-submenu-selected > .ant-menu-submenu-title {
      color: var(--color-white-solid, #fff) !important;
      svg path {
        stroke: var(--color-white-solid, #fff);
      }
    }
    .ant-menu-sub {
      background: transparent !important;
      margin-left: 26px;
      border-left: 1px solid var(--color-grey-500, #64748b);
      .ant-menu-item {
        margin-left: 0.5rem !important;
      }
    }
    .ant-menu-submenu-arrow {
      color: var(--color-grey-400, #94a3b8) !important;
    }
    .ant-menu-inline-collapsed {
      width: auto;
      .ant-menu-item,
      .ant-menu-submenu-title {
        justify-content: center;
        padding: var(--spacing-md, 0.5rem) 0 !important;
        .ant-menu-title-content {
          display: none;
        }
      }
      .ant-menu-submenu-arrow {
        display: none;
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
          display: none;
        }
      }
      .expand-sidebar {
        cursor: pointer;
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
        &:hover {
          background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
        }
      }
    }
    .ant-menu {
      .ant-menu-item,
      .ant-menu-submenu-selected,
      .ant-menu-submenu {
        width: 2.5rem !important;
        display: flex;
        padding: 0 !important;
        svg {
          margin: 0.625rem;
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
        }
        .ant-menu-submenu-title {
          width: 2.5rem;
          display: flex;
          padding: 0 !important;
          svg {
            margin: 0.625rem;
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      }
      .ant-menu-submenu-selected {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
      }
    }
  }
`;

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const defaultOpenKeys = (() => {
    for (const router of ROUTERS_CONFIG) {
      if (router.childrens?.some((c) => c.path === location.pathname)) {
        return [router.key];
      }
    }
    return [];
  })();

  const menuItems = useMemo(
    () =>
      ROUTERS_CONFIG.map((router) => {
        const icon = <router.icon fontSize="1.25rem" />;
        if (router.childrens) {
          return {
            key: router.key,
            icon,
            label: router.name,
            children: router.childrens.map((child) => ({
              key: child.key,
              icon: <child.icon fontSize="1.25rem" />,
              label: child.name,
            })),
          };
        }
        return { key: router.key, icon, label: router.name };
      }),
    [],
  );

  /** Build a key→path lookup from ROUTERS_CONFIG */
  const pathMap = useMemo(() => {
    const map = {};
    for (const r of ROUTERS_CONFIG) {
      map[r.key] = r.path;
      if (r.childrens) {
        for (const c of r.childrens) {
          map[c.key] = c.path;
        }
      }
    }
    return map;
  }, []);

  const onMenuClick = ({ key }) => {
    const path = pathMap[key];
    if (path) navigate(path);
  };

  return (
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
        {isCollapsed && (
          <div className="expand-sidebar" onClick={() => setIsCollapsed(false)}>
            <IconExpand fontSize="1.25rem" />
          </div>
        )}
      </div>
      <div className="sidebar-content">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={activeKey ? [activeKey] : []}
          defaultOpenKeys={defaultOpenKeys}
          inlineCollapsed={isCollapsed}
          items={menuItems}
          onClick={onMenuClick}
        />
      </div>
    </Wrapper>
  );
};

export default SideBar;
