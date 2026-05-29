const Tabs = ({
  activeTab,
  setActiveTab
}) => {

  const tabItems = [
    "overview",
    "repositories",
    "followers"
  ];

  return (

    <section className="tabs-container">

      {
        tabItems.map((tab) => (

          <button
            key={tab}
            className={
              activeTab === tab
                ? "tab-button active-tab"
                : "tab-button"
            }
            onClick={() =>
              setActiveTab(tab)
            }
          >

            {
              tab.charAt(0).toUpperCase() +
              tab.slice(1)
            }

          </button>
        ))
      }

    </section>
  );
};

export default Tabs;
