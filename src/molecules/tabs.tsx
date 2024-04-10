import type { ComponentProps, ReactNode } from "react";
import React, { useState } from "react";
import { Flex } from "../helpers/flex.tsx";

export type TabsType = {
  fullWidth?: boolean;
  children: ReactNode;
} & ComponentProps<"div">;

/** *
 * @function Tabs
 *
 * @see {@link https://rfui.deno.dev/molecules/tabs}
 *
 * @example
 * <Tabs>
 *   <TabSection tabName="First">One</TabSection>
 *   <TabSection tabName="Second">Two</TabSection>
 *   <TabSection tabName="Third">Three</TabSection>
 * </Tabs>
 */
export const Tabs = ({ fullWidth = false, children, ...rest }: TabsType) => {
  const tabNames = getTabNames(children);
  const [activeTab, setActiveTab] = useState<string>(tabNames[0]);
  const activeTabSection = getActiveTabSection(children, activeTab);

  return (
    <div {...rest}>
      <Flex className="border-b border-b-neutral-500">
        {tabNames.map((tabName) => (
          <Tab
            tabName={tabName}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab(tabName);
            }}
            fullWidth={fullWidth}
          />
        ))}
      </Flex>
      <div className="mt-6">{activeTabSection}</div>
    </div>
  );
};

const getTabNames = (children: ReactNode): string[] => {
  const childrenArray = React.Children.toArray(children);

  return childrenArray.map((child: any) => child.props.tabName);
};

const getActiveTabSection = (children: ReactNode, tabName: string) => {
  const childrenArray = React.Children.toArray(children);

  return childrenArray.find((child: any) => child.props.tabName === tabName);
};

const Tab = ({
  tabName,
  activeTab,
  onClick,
  fullWidth,
}: {
  tabName: string;
  activeTab: string;
  onClick: () => void;
  fullWidth: boolean;
}) => {
  const isActive = tabName === activeTab;
  let containerClass = "rfui-tab px-5 text-center py-4 cursor-pointer";

  if (isActive) {
    containerClass += " border-b text-neutral-900";
  } else {
    containerClass += " text-neutral-700";
  }

  if (fullWidth) {
    containerClass += " w-full";
  }

  return (
    <div className={containerClass} onClick={onClick}>
      {tabName}
    </div>
  );
};

export const TabSection = ({
  children,
}: {
  tabName: string;
  children: ReactNode;
}) => {
  return <>{children}</>;
};
