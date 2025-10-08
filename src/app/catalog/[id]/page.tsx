import { api } from '@/api/campers';
import { Camper } from '@/types/camper';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

export default async function CamperDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return <CamperDetails camper={data} />;
}
