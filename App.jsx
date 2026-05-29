import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";

import Overview from "./components/Overview";
import Repositories from "./components/Repositories";
import Followers from "./components/Followers";

const App = () => {

  // Username State
  const [username, setUsername] = useState("octocat");

  // Data States
  const [profileData, setProfileData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  // Loading States
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isRepoLoading, setIsRepoLoading] = useState(false);
  const [isFollowersLoading, setIsFollowersLoading] = useState(false);

  // UI States
  const [currentTab, setCurrentTab] = useState("overview");
  const [errorMessage, setErrorMessage] = useState("");

  // Restore Scroll Position
  useEffect(() => {

    const scrollValue =
      sessionStorage.getItem("github-scroll");

    if (scrollValue) {
      window.scrollTo(0, parseInt(scrollValue));
    }

    const saveScroll = () => {
      sessionStorage.setItem(
        "github-scroll",
        window.scrollY
      );
    };

    window.addEventListener("scroll", saveScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        saveScroll
      );
    };

  }, []);

  // Generic Fetch Function
  const fetchGithubData = async (
    url,
    setData,
    setLoading,
    showError = false
  ) => {

    const controller = new AbortController();

    try {

      setLoading(true);

      const response = await fetch(url, {
        signal: controller.signal
      });

      if (!response.ok) {

        if (showError) {
          throw new Error("GitHub User Not Found");
        }

        return;
      }

      const data = await response.json();

      setData(data);

    } catch (error) {

      if (error.name !== "AbortError") {

        if (showError) {
          setErrorMessage(error.message);
        }

        console.log(error);
      }

    } finally {

      setLoading(false);
    }

    return () => controller.abort();
  };

  // Fetch Profile
  useEffect(() => {

    setErrorMessage("");

    fetchGithubData(
      `https://api.github.com/users/${username}`,
      setProfileData,
      setIsProfileLoading,
      true
    );

  }, [username]);

  // Fetch Repositories
  useEffect(() => {

    fetchGithubData(
      `https://api.github.com/users/${username}/repos`,
      setRepoData,
      setIsRepoLoading
    );

  }, [username]);

  // Fetch Followers
  useEffect(() => {

    fetchGithubData(
      `https://api.github.com/users/${username}/followers`,
      setFollowersData,
      setIsFollowersLoading
    );

  }, [username]);

  return (

    <div className="container">

      <h1 className="title">
        GitHub Explorer Dashboard
      </h1>

      <SearchBar setUsername={setUsername} />

      {
        errorMessage &&
        <p className="error">
          {errorMessage}
        </p>
      }

      <Tabs
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
      />

      <div className="content-area">

        {
          currentTab === "overview" && (

            <Overview
              profile={profileData}
              loading={isProfileLoading}
            />
          )
        }

        {
          currentTab === "repositories" && (

            <Repositories
              repos={repoData}
              loading={isRepoLoading}
            />
          )
        }

        {
          currentTab === "followers" && (

            <Followers
              followers={followersData}
              loading={isFollowersLoading}
            />
          )
        }

      </div>

    </div>
  );
};

export default App;
