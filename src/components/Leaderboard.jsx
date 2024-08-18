import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { CubeSpinner } from 'react-spinners-kit';
import { MdLeaderboard } from "react-icons/md";
import { AdminContext } from '../contexts/authContext';


export default function Leaderboard() {
 const {profile} = useContext(AdminContext)
 console.log(profile)
  const [champions, setAllChampions] = useState([])
  const [loading, setLoading] = useState(false)
  const sortedChampions = champions.sort((a,b)=>b.scorePoints-a.scorePoints)
  useEffect(function(){
   async function getAllUsers(){
    
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/user/all-users`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data)
        setAllChampions(data.data.users)
        setLoading(false)
        
      } catch (error) {
        toast.error(error?.message)
      }
      
    }
  getAllUsers();}, [])
  return (

  <div
    className={`inset-0 fixed bg-[#2A303C] sm:w-full lg:w-[60%] mx-auto h-[90vh] ${
      loading ? "flex" : ""
    } items-center justify-center rounded-[20px] mt-8`}
  >
    <p className="absolute top-10 right-12 text-white text-4xl text-end">
      &times;
    </p>

    {loading && (
      <div className="flex items-center flex-col justify-center place-self-center gap-4 ">
        <CubeSpinner />
        <p className="my-1 text-2xl"> Loading champions...</p>
      </div>
    )}

    {!loading && champions && (
      <div className="pt-[70px] h-full flex flex-col">
        <div className="w-[90%] mx-auto mb-8 text-center">
          <p className="ml-10 text-5xl font-semibold flex items-center justify-center">
            Champions Leaderboard{" "}
            <span className="ml-3">
              <MdLeaderboard />
            </span>
          </p>
        </div>
        <div className="w-[90%] mx-auto flex-grow overflow-y-auto scrollbar-hide mb-12">
          <table className="w-full border-spacing-y-6 border-separate">
            <thead className="sticky top-0 bg-[#2A303C] z-10">
              <tr className="text-2xl shadow-lg">
                <th className="py-4">Rank</th>
                <th className="py-4">Champion's Name</th>
                <th className="py-4">Points</th>
              </tr>
            </thead>
            <tbody className="text-2xl border-collapse">
              {sortedChampions &&
                profile &&
                champions.map((champion, index) => (
                  <tr
                    key={champion._id}
                    className={`${
                      champion._id == profile?.data?._id
                        ? "bg-[#00FF89] text-[#495057]"
                        : "bg-[#495057]"
                    }`}
                  >
                    <td className="font-semibold text-2xl py-6 text-center rounded-l-[100px]">
                      #{index + 1}
                    </td>
                    <td className="capitalize font-semibold text-2xl py-5 flex gap-3 items-center justify-center">
                      <img
                        className="w-12 h-12 border rounded-full"
                        src={champion.avatar}
                        alt={champion.name}
                      />
                      {champion.name}
                    </td>
                    <td className="py-5 text-2xl text-center font-semibold rounded-r-[100px]">
                      {champion.scorePoints}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);


}
