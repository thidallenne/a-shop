import { useState, useEffect, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import axios from "axios";
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { classNames } from "primereact/utils";

export default function ProductsAdmin(){

      let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [editingRows, setEditingRows] = useState({});
    const [selectedProducts, setSelectedProducts] = useState(null);


    useEffect(() => {
        axios.get('/src/assets/products.json')
          .then((res) => setProducts(res.data.data))
          .catch((err) => console.error(err));
      }, []);

    /* Depuis une API, remplacer l'URL par celui de l'API  */
    // useEffect(() =>{
    //     axios.get('https://urldelapi.com/products')
    //     .then((res) => setProducts(res.data));
    // }, []);

    //New Product
    const openNew = () => {
      setProduct(emptyProduct);
      setSubmitted(false);
      setProductDialog(true);
    };

    const hideDialog = () => {
      setSubmitted(false);
      setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
      setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
      let index = -1;

      for (let i = 0; i < products.length; i++) {
          if (products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
    };


    const createCode = () => {
      let code = '';
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 5; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    const confirmDeleteSelected = () => {
      setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
      let _products = products.filter((val) => !selectedProducts.includes(val));

      setProducts(_products);
      setDeleteProductsDialog(false);
      setSelectedProducts(null);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onIdChange = (e) => {
      let _product = { ...product };

      _product['id'] = e.value;
      setProduct(_product);
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const saveProduct = () => {
      setSubmitted(true);

      if (product.name.trim()) {
          let _products = [...products];
          let _product = { ...product };

          if (product.id && (findIndexById(product.id) > -1)) {
              toast.current.show({ severity: 'failure', summary: 'Failure', detail: 'Product exist already', life: 3000 });
          } else {
              _product.code = createCode();
              _product.image = 'product-placeholder.svg';
              _products.push(_product);
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          setProducts(_products);
          setProductDialog(false);
          setProduct(emptyProduct);
      }
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </>
    );

    const deleteProductsDialogFooter = (
      <>
          <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
          <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
      </>
  );


    // Editer une ligne

    const onRowEditInit = (event) => {
        let newEditingRows = { ...editingRows };
        newEditingRows[event.index] = true;
        setEditingRows(newEditingRows);
      };
    
      const onRowEditCancel = (event) => {
        let newEditingRows = { ...editingRows };
        delete newEditingRows[event.index];
        setEditingRows(newEditingRows);
      };
    
      const onRowEditSave = (event) => {
        let editedProducts = [...products];
        let { newData, index } = event;
        editedProducts[index] = newData;
    
        setProducts(editedProducts);
    
        let newEditingRows = { ...editingRows };
        delete newEditingRows[index];
        setEditingRows(newEditingRows);
      };
    
      const textEditor = (options) => {
        return (
          <InputText
            type="text"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
          />
        );
      };

      const deleteBodyTemplate = (rowData) => {
        return (
          <Button
            icon="pi pi-trash"
            rounded text
            className="p-button-rounded"
            onClick={() => deleteProduct(rowData)}
          />
        );
      };


    return (
        <>
          <Toast ref={toast} />
          <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable
                ref={dt} 
                value={products}
                responsiveLayout="scroll"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 20, 30]}
                datakey="id"
                paginator
                emptyMessage="Pas de données trouvées"
                className="datatable-responsive"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                rows={10}
                filterDisplay="row"
                globalFilterFields={['code', 'name']}
                editMode="row"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
                onRowEditComplete={onRowEditSave}
                selectionMode="checkbox"
                selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
            >   
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="code" header="code" editor={(options) => textEditor(options)} filter sortable filterPlaceholder="Search by code" style={{ minWidth: '12rem' }}></Column>
                <Column field="name" header="Name" editor={(options) => textEditor(options)} filter sortable filterPlaceholder="Search by name"  style={{ minWidth: '12rem' }} />
                <Column
                    rowEditor 
                    header="Actions"
                    headerStyle={{ width: '2rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    />
                <Column
                    body={deleteBodyTemplate}
                    headerStyle={{ width: '2rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                />
            </DataTable>
            </div>
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="id" className="font-bold">
                            Id
                        </label>
                        <InputNumber id="id" value={product.id} onValueChange={(e) => onIdChange(e, 'id')} />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </>
    )
}