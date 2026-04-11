"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { addUser } from "@/redux/slice/usersSlice";
import { addRaiting } from "@/redux/slice/raitingAppSlice";

export default function InitDataLoader() {
  const dispatch = useAppDispatch();

  const users = useSelector((state: RootState) => state.usersResult.users);
  const raiting = useSelector((state: RootState) => state.raiting.raiting);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const fetchData = async () => {
      // Ken store fergha bark
      if (users?.length === 0) {
        const data = await getDocs(collection(db, "users"));
        const listUsers = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(addUser(listUsers));
      }

      if (raiting.length === 0) {
        const raitingData = await getDocs(collection(db, "raiting"));
        const listRaiting = raitingData.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(addRaiting(listRaiting));
      }
    };

    fetchData();
  }, [dispatch, users?.length, raiting.length]);

  return null;
}