export type HomePageHeaderProps = {
  isSideMenuVisible: boolean;
  isProfileMenuVisibile: boolean;
  setIsSideMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProfileMenuVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSideMenuVisibility: () => void;
  toggleProfileMenuVisibility: () => void;
};
