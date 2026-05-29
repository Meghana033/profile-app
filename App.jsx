import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import Overview from "./components/Overview";
import Repositories from "./components/Repositories";
import Followers from "./components/Followers";

function App() {
  const [username, setUsername] = useState("octocat");

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  const [error, setError] = useState("");

  // Persistent Scroll
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scroll-position");

    if (savedScroll) {
      window.scrollTo(0, Number(savedScroll));
    }

    const handleScroll = () => {
      sessionStorage.setItem(
        "scroll-position",
        window.scrollY
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch Profile
  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();

        setProfile(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, [username]);

  // Fetch Repositories
  useEffect(() => {
    const controller = new AbortController();

    const fetchRepos = async () => {
      try {
        setLoadingRepos(true);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        setRepos(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchRepos();

    return () => controller.abort();
  }, [username]);

  // Fetch Followers
  useEffect(() => {
    const controller = new AbortController();

    const fetchFollowers = async () => {
      try {
        setLoadingFollowers(true);

        const response = await fetch(
          `https://api.github.com/users/${username}/followers`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        setFollowers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingFollowers(false);
      }
    };

    fetchFollowers();

    return () => controller.abort();
  }, [username]);

  return (
    <div className="container">
      <h1 className="title">
        GitHub Profile Dashboard
      </h1>

      <SearchBar setUsername={setUsername} />

      {error && <p className="error">{error}</p>}

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="content">
        {activeTab === "overview" && (
          <Overview
            profile={profile}
            loading={loadingProfile}
          />
        )}

        {activeTab === "repositories" && (
          <Repositories
            repos={repos}
            loading={loadingRepos}
          />
        )}

        {activeTab === "followers" && (
          <Followers
            followers={followers}
            loading={loadingFollowers}
          />
        )}
      </div>
    </div>
  );
}

export default App;