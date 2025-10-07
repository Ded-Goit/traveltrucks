import { api } from '@/api/api';
import { Camper } from '@/types/camper';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

export default async function CamperDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await api.get<Camper>(`/campers/${params.id}`);
  return <CamperDetails camper={data} />;
}
