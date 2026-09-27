interface PanelTitleProps {
  title: string;
  description: string;
}

const PanelTitle: React.FC<PanelTitleProps> = ({ title, description }) => {
  return (
    <div className="p-6">
      <h5 className="dark:text-white">{title}</h5>
      <p className="leading-normal text-sm">{description}</p>
    </div>
  );
};

export default PanelTitle;
