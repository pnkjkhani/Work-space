import React, { useState } from "react";
import { ScrollArea, Table } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons"; // Import CheckIcon
import { IconButton } from "@radix-ui/themes"; // Import IconButton

const ProductSelectionTable = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const products = [
    {
      id: 1,
      link: "https://productlink.com/product/p/66a74a",
      description: "Wireless Bluetooth Headphones with Noise Cancellation",
      sku: "SKU: WBHNC-001-BK"
    },
    {
      id: 2,
      link: "https://productlink.com/product/p/89b23c",
      description: "Ultra HD 4K Smart TV - 55 inch",
      sku: "SKU: TV4K-55-SLV"
    },
    {
      id: 3,
      link: "https://productlink.com/product/p/12c45d",
      description: "Ergonomic Office Chair with Lumbar Support",
      sku: "SKU: EOCLS-100-BL"
    },
    {
      id: 4,
      link: "https://productlink.com/product/p/34e67f",
      description: "Professional DSLR Camera with 24-70mm Lens",
      sku: "SKU: DSLR-PRO-24-70"
    },
    {
      id: 5,
      link: "https://productlink.com/product/p/78g90h",
      description: "Smart Home Security System with 4 Cameras",
      sku: "SKU: SHSS-4CAM-WH"
    },
    {
      id: 6,
      link: "https://productlink.com/product/p/23i45j",
      description: "High-Performance Gaming Laptop - 15.6 inch",
      sku: "SKU: GMLP-15-RTX"
    },
    {
      id: 7,
      link: "https://productlink.com/product/p/56k78l",
      description: "Stainless Steel French Door Refrigerator",
      sku: "SKU: SSFDR-36-SS"
    },
    {
      id: 8,
      link: "https://productlink.com/product/p/90m12n",
      description: "Wireless Charging Pad for Smartphones",
      sku: "SKU: WCPS-10W-BK"
    },
    {
      id: 9,
      link: "https://productlink.com/product/p/34o56p",
      description: "Robot Vacuum Cleaner with Mapping Technology",
      sku: "SKU: RVCMT-2000-GR"
    },
    {
      id: 10,
      link: "https://productlink.com/product/p/78q90r",
      description: "Portable Bluetooth Speaker with 360° Sound",
      sku: "SKU: PBS360-20W-RD"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map((product) => product.id)));
    }
    setSelectAll(!selectAll);
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <IconButton
              radius="medium"
              variant="surface"
              onClick={toggleSelectAll}
            >
              {selectAll ? (
                <CheckIcon />
              ) : (
                <CheckIcon style={{ visibility: "hidden" }} />
              )}
            </IconButton>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Product Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Product SKU</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{ height: 350, width: "100%" }}
        > */}
          {filteredProducts.map((product) => (
            <Table.Row key={product.id}>
              <Table.RowHeaderCell>
                <IconButton
                  radius="medium"
                  variant="surface"
                  onClick={() => toggleProductSelection(product.id)}
                >
                  {selectedProducts.has(product.id) ? (
                    <CheckIcon />
                  ) : (
                    <CheckIcon style={{ visibility: "hidden" }} />
                  )}
                </IconButton>
              </Table.RowHeaderCell>
              <Table.Cell>{product.link}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.sku}</Table.Cell>
            </Table.Row>
          ))}
        {/* </ScrollArea> */}
      </Table.Body>
    </Table.Root>
  );
};

export default ProductSelectionTable;
