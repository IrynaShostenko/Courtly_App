import type { Trainer } from '@/src/types/trainer';

const TRAINERS_URL = 'https://randomuser.me/api/?results=5&nat=us,gb,de,ua&inc=id,name,picture,phone';

type RandomUserResponse = {
  results: {
    id: { uuid: string };
    name: { first: string; last: string };
    picture: { large: string; medium: string; thumbnail: string };
    phone: string;
  }[];
};

export async function fetchTrainers(): Promise<Trainer[]> {
  const res = await fetch(TRAINERS_URL);
  if (!res.ok) throw new Error(`Trainers request failed: ${res.status}`);

  const json = (await res.json()) as RandomUserResponse;

  return json.results.map((u) => ({
    id: u.id.uuid,
    name: `${u.name.first} ${u.name.last}`,
    photoUrl: u.picture.large,
    phone: u.phone,
  }));
}
