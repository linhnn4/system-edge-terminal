import IconDown from "@/assets/svgs/chevron-down.svg?react";
import ROUTERS_CONFIG from "@/utils/routers";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  /* Shadows/shadow-xs */
  box-shadow: 0 1px 2px 0
    var(--Colors-Effects-Shadows-shadow-xs, rgba(255, 255, 255, 0));
  .sidebar-header {
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    width: 100%;
    border-bottom: 1px solid #22262f;
    .workspace {
      cursor: pointer;
      display: flex;
      height: 3.5rem;
      padding: 0.5rem 0.75rem;
      align-items: center;
      gap: 0.5rem;
      align-self: stretch;
      border-radius: 0.375rem;
      overflow: hidden;
      color: var(--color-white-solid, #fff);
      text-overflow: ellipsis;

      /* general/Semibold */
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-style: normal;
      font-weight: var(--font-weight-600, 600);
      line-height: var(--line-height-20, 1.25rem); /* 142.857% */
      transition: background 0.2s ease;
      &:hover {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
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
        background: linear-gradient(
          135deg,
          var(--color-azure-600, #448bff) 0%,
          var(--color-blue-500, #4f46e5) 100%
        );
        box-shadow:
          0 10px 15px -3px rgba(59, 130, 246, 0.2),
          0 4px 6px -4px rgba(59, 130, 246, 0.2);
      }
    }
  }
  .sidebar-content {
    width: 100%;
    padding: 0.5rem 0.75rem;
    .sidebar-item {
      display: flex;
      height: 2.75rem;
      padding: var(--spacing-md, 0.5rem) var(--spacing-xl, 1rem);
      align-items: center;
      gap: 0.5rem;
      align-self: stretch;
      border-radius: var(--radius-sm, 0.375rem);
      color: var(--general-Gull-Gray, var(--color-grey-400, #94a3b8));
      text-align: center;

      /* general/Semibold */
      font-family: var(--font-family-Font-1, Inter);
      font-size: var(--font-size-14, 0.875rem);
      font-style: normal;
      font-weight: var(--font-weight-600, 600);
      line-height: var(--line-height-20, 1.25rem); /* 142.857% */
      cursor: pointer;
      transition:
        background 0.2s ease,
        color 0.2s ease;
      &:hover,
      &.active {
        background: var(--color-grey-70050, rgba(51, 65, 85, 0.5));
        color: var(--color-white-solid, #fff);
      }
    }
  }
`;

const SideBar = () => {
  const location = useLocation();

  const activeKey = useMemo(() => {
    const currentRouter = ROUTERS_CONFIG.find(
      (router) => router.path === location.pathname,
    );
    return currentRouter ? currentRouter.key : null;
  }, [location.pathname]);
  return (
    <Wrapper>
      <div className="sidebar-header">
        <div className="workspace">
          <div className="icon">D</div>
          <div className="name">Demo-001</div>
          <IconDown fontSize="1.25rem" />
        </div>
      </div>
      <div className="sidebar-content">
        {ROUTERS_CONFIG.map((router) => (
          <div
            key={router.key}
            className={`sidebar-item ${activeKey === router.key ? "active" : ""}`}
          >
            <router.icon fontSize="1.25rem" />
            <span>{router.name}</span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default SideBar;
