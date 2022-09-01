import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProvider,
  createBox,
  getBoxesAdmin,
} from "../../redux/actions/boxesActions";
import { getProducts } from "../../redux/actions/productsActions";
import { createProduct } from "../../redux/actions/productsActions";
import { toast } from "react-toastify";

export default function useForm(validate) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const boxes = useSelector((state) => state.boxes);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBoxesAdmin());
  }, [dispatch]);

  const data = {
    boxes,
    products,
  };
  //BOX
  const [input, setInput] = useState({
    boxName: "",
    boxPrice: "",
    boxDetail: "",
    boxExpirationDate: "",
    boxPerson: "",
    boxProducts: [],
    boxCategories: [],
  });
  const [boxImg, setBoxImg] = useState("");

  const handleChangeBoxImg = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBoxImg(reader.result);
      };
    } else {
      setBoxImg("");
    }
  };
  const handleChangeBox = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        data
      )
    );
  };

  const handleChangeProd = (e) => {
    setInput({
      ...input,
      boxProducts: [...e.target.value],
    });
  };

  const handleChangeCat = (e) => {
    setInput({
      ...input,
      boxCategories: [...e.target.value],
    });
  };

  const dataBox = {
    name: input.boxName,
    detail: input.boxDetail,
    price: input.boxPrice,
    expiration_date: input.boxExpirationDate,
    image: boxImg,
    person: input.boxPerson,
    products: input.boxProducts,
    category: input.boxCategories,
  };

  const handleBoxSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(createBox(dataBox));
      toast.success("Save data", {
        position: "top-right",
      });
      setInput({
        boxName: "",
        boxPrice: "",
        boxDetail: "",
        boxExpirationDate: "",
        boxPerson: "",
        boxImage: "",
        boxProducts: [],
        boxCategories: [],
      });
      setBoxImg("");
    } else {
      toast.error("Incorrect data, check againt", {
        position: "top-right",
      });
    }
  };

  //PRODUCT
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productLocation: "",
    productProvider: "",
  });
  const [productImg, setProductImg] = useState("");

  const handleChangeProductImg = (e) => {
    const file = e.target.files[0];
    transformFileProduct(file);
  };

  const transformFileProduct = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };
  const handleProductChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...product,
          [e.target.name]: e.target.value,
        },
        data
      )
    );
  };

  const dataProduct = {
    name: product.productName,
    description: product.productDescription,
    price: product.productPrice,
    location: product.productLocation,
    image: productImg,
    provider: product.productProvider,
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(createProduct(dataProduct));
      setProduct({
        productName: "",
        productDescription: "",
        productPrice: "",
        productLocation: "",
        productImage: "",
        productProvider: "",
      });
      setProductImg("");
      toast.success("Save data", {
        position: "top-right",
      });
    } else {
      toast.error("Incorrect data, check againt", {
        position: "top-right",
      });
    }
  };

  //PROVIDER
  const [provider, setProvider] = useState({
    providerName: "",
    providerPhone: "",
    providerAddress: "",
    providerEmail: "",
  });
  const handleProviderChange = (e) => {
    setProvider({
      ...provider,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...provider,
        [e.target.name]: e.target.value,
      })
    );
  };
  const dataProvider = {
    name: provider.providerName,
    phone: provider.providerPhone,
    email: provider.providerEmail,
    address: provider.providerAddress,
  };
  const handleProviderSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(createProvider(dataProvider));
      setProvider({
        providerName: "",
        providerPhone: "",
        providerAddress: "",
        providerEmail: "",
      });
      toast.success("Save data", {
        position: "top-right",
      });
    } else {
      toast.error("Incorrect data, check againt", {
        position: "top-right",
      });
    }
  };
  return {
    errors,
    input,
    product,
    provider,
    dataBox,
    dataProduct,
    handleChangeBox,
    handleChangeProductImg,
    handleChangeProd,
    handleChangeCat,
    handleProductChange,
    handleProviderChange,
    handleChangeBoxImg,
    handleBoxSubmit,
    handleProductSubmit,
    handleProviderSubmit,
  };
}
