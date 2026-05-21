export const WA_NUMBER = "5491153258828";

export function waLink(message = "Hola GSMFix! Quiero consultar sobre una reparación.") {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}
