interface PanelTitleProps {
  title: string;
}

const PageHeader: React.FC<PanelTitleProps> = ({ title }) => {
  return (
    <div className="my-6 ml-4">
      <h2 className="font-medium dark:text-white">{title}</h2>
    </div>
  );
};

export default PageHeader;
