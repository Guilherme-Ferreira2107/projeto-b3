import * as yup from "yup";

export const filterSchema = yup.object().shape({
  currency: yup.string().required("A seleção é obrigatório"),
});
