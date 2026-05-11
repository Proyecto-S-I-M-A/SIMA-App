import { RecetasYDosisResponse } from "@/types/RecetasYDosis";

export default function useHome(data: RecetasYDosisResponse | undefined) {
  const CantidadReceta = data?.length || 0;
  const CantidadActiva = data?.filter(receta => receta.estado === "pendiente").length || 0;
  const CantidadRetirada = data?.filter(receta => receta.estado === "retirada").length || 0;
  return {
    CantidadReceta,
    CantidadActiva,
    CantidadRetirada
  }
}