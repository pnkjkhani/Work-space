import React, { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { CheckIcon } from '@radix-ui/react-icons';
import { Flex, Link } from '@radix-ui/themes';


const ProductSelectionTable = () => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    link: `https://productlink.com/product/#p/66a74a`,
    description: 'Lorem ipsum dolor amet set',
    sku: 'SKU: 12345-BL-XL',
  }));

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

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <Flex direction="column" width="100%">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Product Description</th>
                <th>Product SKU</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Flex >
                      <Checkbox.Root
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Link href={product.link} target="_blank" rel="noopener noreferrer">
                        {product.link}
                      </Link>
                    </Flex>
                  </td>
                  <td>
                    <Flex align="center" justify="center">
                      {product.description}
                    </Flex>
                  </td>
                  <td>
                    <Flex align="center" justify="center">
                      {product.sku}
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>

      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};

export default ProductSelectionTable;
