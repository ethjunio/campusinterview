import ClientLayoutWrapper from "../_components/clientLayoutWrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
};

export default layout;