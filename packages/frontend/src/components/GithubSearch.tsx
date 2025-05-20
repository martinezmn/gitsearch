import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../api/ApiService";
import type { GitProfileInterface } from "../interfaces/git-profile.interface";

export default function GithubSearch() {
  const { data: profiles, isLoading } = useQuery({
    queryFn: () => ApiService.getGithubProfiles(),
    queryKey: ["git-profiles"],
  });

  return (
    <>
      <div className="flex py-12 px-6 lg:px-8">
        <div className="flex min-h-full flex-1 flex-col justify-center ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="GitHub Logo"
              src="https://img.icons8.com/ios_filled/512/github.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Search for GitHub users
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  GitHub Username
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center">
          <ul role="list" className="divide-y divide-gray-100">
            {!isLoading &&
              profiles.map((profile: GitProfileInterface) => (
                <li
                  key={profile.login}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt=""
                      src={profile.avatarUrl}
                      className="size-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {profile.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {profile.login}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">{profile.bio}</p>
                    <p className="mt-1 text-xs/5 text-gray-500">
                      {profile.followers}
                      {profile.followers === 1 ? " follower" : " followers"}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
