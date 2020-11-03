export const dateParse = (date, type) => {
  let d = new Date(date);
  let locale = d.toLocaleString('pt-BR', { timeZone: 'UTC' })
  locale = locale.split(" ")[0].split("/")
  
  let dia = locale[0], mes = locale[1], ano = locale[2];
  
  if (type === 'br') {
    return dia+"/"+mes+"/"+ano;
  }
  return ano+"-"+mes+"-"+dia;
}