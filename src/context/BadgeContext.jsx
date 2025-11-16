import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserBadges, sendBadgeEvent } from "../lib/api";
import { useNavigate } from "react-router-dom";

const BadgeContext = createContext();
export const useBadges = () => useContext(BadgeContext);

export const BadgeProvider = ({ children, currentUser }) => {
  const navigate = useNavigate();

  const [unlockedBadges, setUnlockedBadges] = useState([]);

  const [badgeMeta, setBadgeMeta] = useState(null);

  const [modalState, setModalState] = useState({
    show: false,
    badges: [],
  });

  // Load badge metadata + user's unlocked list
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/badges.json");
        const json = await res.json();
        setBadgeMeta(json);
      } catch (err) {
        console.error("Failed to load badges.json", err);
      }

      if (currentUser?.id) {
        try {
          const res = await getUserBadges(currentUser.id);

          if (res?.success) {
            setUnlockedBadges(res.badges || []);
          } else {
            setUnlockedBadges(res || []);
          }
        } catch (err) {
          console.error("Failed to load user badges", err);
        }
      }
    })();
  }, [currentUser]);

  // Trigger badge unlock event
  const triggerBadge = async (eventName) => {
    if (!currentUser?.id) return;

    try {
      const res = await sendBadgeEvent({
        userId: currentUser.id,
        event: eventName,
      });

      if (res?.success && res.unlockedBadges?.length > 0) {
        const newUnlocks = res.unlockedBadges.map((b) => ({
          badgeId: b.badgeId,
          name: b.name,
          unlockedAt: Date.now(),
        }));

        // Add to unlocked badges
        setUnlockedBadges((prev) => [...prev, ...newUnlocks]);

        // Show unlock modal
        setModalState({
          show: true,
          badges: newUnlocks,
        });
      }

      return res?.unlockedBadges || [];
    } catch (err) {
      console.error("Badge event error:", err);
      return [];
    }
  };

  const closeModal = () =>
    setModalState({
      show: false,
      badges: [],
    });

  const goToHall = () => {
    closeModal();
    navigate("/badges");
  };

  return (
    <BadgeContext.Provider
      value={{
        badgeMeta,
        unlockedBadges,
        modalState,
        triggerBadge,
        closeModal,
        goToHall,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
};
