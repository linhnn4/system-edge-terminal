import IconBriefCase from "@/assets/svgs/brief-case.svg?react";
import IconCheckFill from "@/assets/svgs/check-fill.svg?react";
import IconDown from "@/assets/svgs/chevron-down.svg?react";
import IconCollapse from "@/assets/svgs/chevron-left-double.svg?react";
import IconExpand from "@/assets/svgs/chevron-right-double.svg?react";
import IconSettings from "@/assets/svgs/settings.svg?react";
import IconShare from "@/assets/svgs/share.svg?react";
import IconUserCircle from "@/assets/svgs/user-circle.svg?react";
import useUser from "@/reducers/user";
import ROUTERS_CONFIG from "@/utils/routers";
import { Popover, Tooltip } from "antd";
import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { FlyoutMenu, WorkspacePopoverContent, Wrapper } from "./SideBar.styled";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const { user, logout } = useUser(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    })),
  );

  // TODO: replace with real data from API
  const currentWorkspace = { name: "Demo-001", plan: "Free Plan", members: 2 };
  const workspaces = [
    { id: 1, name: "Pepperstone Live" },
    { id: 2, name: "Demo-001" },
    { id: 3, name: "SystemEdge Trading Team" },
  ];
  const activeWorkspaceId = 2;

  const handleLogout = () => {
    setIsPopoverOpen(false);
    logout();
    navigate("/login");
  };

  const popoverContent = (
    <WorkspacePopoverContent>
      <div className="dropdown-header">
        <div className="dropdown-icon">
          {currentWorkspace.name.charAt(0).toUpperCase()}
        </div>
        <div className="dropdown-info">
          <div className="dropdown-name-row">
            <span className="dropdown-name">{currentWorkspace.name}</span>
            <span className="dropdown-badge">{currentWorkspace.plan}</span>
          </div>
          <div className="dropdown-members">
            {currentWorkspace.members} members
          </div>
        </div>
      </div>
      <div className="dropdown-actions">
        <button
          className="dropdown-action-btn"
          onClick={() => {
            setIsPopoverOpen(false);
            navigate("/settings/workspace");
          }}
        >
          <IconSettings />
          Setting
        </button>
        <button className="dropdown-action-btn">
          <IconUserCircle />
          Invite Members
        </button>
      </div>
      <div className="dropdown-email">
        {user?.info?.email || user?.email || ""}
      </div>
      <div className="dropdown-workspaces">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="dropdown-workspace-item"
            onClick={() => setIsPopoverOpen(false)}
          >
            <IconBriefCase />
            {ws.name}
            {ws.id === activeWorkspaceId && (
              <span className="workspace-check">
                <IconCheckFill fontSize="1.25rem" />
              </span>
            )}
          </div>
        ))}
        <div
          className="dropdown-create"
          onClick={() => {
            setIsPopoverOpen(false);
            navigate("/create-workspace");
          }}
        >
          + Create new workspace
        </div>
      </div>
      <div className="dropdown-footer">
        <div className="dropdown-logout" onClick={handleLogout}>
          <IconShare />
          Log out
        </div>
      </div>
    </WorkspacePopoverContent>
  );

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
          <Popover
            content={popoverContent}
            trigger={["click"]}
            placement="bottomLeft"
            open={isPopoverOpen && !isCollapsed}
            onOpenChange={setIsPopoverOpen}
            overlayClassName="workspace-popover"
            arrow={false}
          >
            <div className="workspace">
              <div className="icon">
                {currentWorkspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="name-wrapper">
                <div className="name">{currentWorkspace.name}</div>
                <IconDown fontSize="1.25rem" />
              </div>
              {!isCollapsed && (
                <div
                  className="collapse-sidebar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                    setIsPopoverOpen(false);
                  }}
                >
                  <IconCollapse fontSize="1.25rem" />
                </div>
              )}
            </div>
          </Popover>
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
