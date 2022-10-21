import { Dialog, dividerClasses } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionQuery } from "../../../hooks";
import { firebaseDb, IMAGE_PROXY, useUserStore } from "../../../library";
import { Spinner } from "../../Spinner/Spinner";

type CreateConversationProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateConversation({
  isModalOpen,
  setIsModalOpen,
}: CreateConversationProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const currentUser = useUserStore((state) => state.currentUser);

  const { data, error, loading } = useCollectionQuery(
    "all-users",
    collection(firebaseDb, "users")
  );

  const navigate = useNavigate();

  const handleToggle = (uid: string) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid));
    } else {
      setSelected([...selected, uid]);
    }
  };

  const handleCreateConversation = async () => {
    setIsCreating(true);

    const sorted = [...selected, currentUser?.uid].sort();

    const QUERY = query(
      collection(firebaseDb, "conversations"),
      where("users", "==", sorted)
    );

    const querySnapshot = await getDocs(QUERY);

    if (querySnapshot.empty) {
      const created = await addDoc(collection(firebaseDb, "conversations"), {
        users: sorted,
        group:
          sorted.length > 2
            ? {
                admins: [currentUser?.uid],
                groupName: null,
                groupImage: null,
              }
            : {},
        updatedAt: serverTimestamp(),
        seen: {},
      });

      setIsCreating(false);

      setIsModalOpen(false);

      navigate(`/${created.id}`);
    } else {
      setIsModalOpen(false);

      navigate(`/${querySnapshot.docs[0].id}`);

      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : error ? (
        <div>
          <p>Something went wrong</p>
        </div>
      ) : (
        <>
          {isCreating && <Spinner />}
          <div>
            {data?.docs
              .filter((doc) => doc.data().uid !== currentUser?.uid)
              .map((doc) => (
                <div
                  key={doc.data().uid}
                  onClick={() => handleToggle(doc.data().uid)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(doc.data().uid)}
                    readOnly
                  />
                  <img src={IMAGE_PROXY(doc.data().photoURL)} alt="" />
                  <p>{doc.data().displayName}</p>
                </div>
              ))}
          </div>
          <div>
            <button
              disabled={selected.length === 0}
              onClick={handleCreateConversation}
            >
              Start conversation
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
}
