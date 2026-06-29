import { RecetasYDosisResponse } from "@/types/RecetasYDosis";

export default function useHome(data: RecetasYDosisResponse | undefined) {
  const CantidadReceta = data?.length || 0;
  const CantidadActiva =
    data?.filter((receta) => receta.estado === "Pendiente").length || 0;
  const CantidadRetirada =
    data?.filter((receta) => receta.estado === "Retirado").length || 0;
  return {
    CantidadReceta,
    CantidadActiva,
    CantidadRetirada,
  };
}
