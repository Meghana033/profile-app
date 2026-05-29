function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={
          activeTab === "overview"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("overview")
        }
      >
        Overview
      </button>

      <button
        className={
          activeTab === "repositories"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("repositories")
        }
      >
        Repositories
      </button>

      <button
        className={
          activeTab === "followers"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("followers")
        }
      >
        Followers
      </button>
    </div>
  );
}

export default Tabs;