
  
  
  class ProductModel {
    description: string = '';
    price?: Price;
    imageUrl: string = '';
    id: string = '';
    name: string = '';
    createdAt: Date = new Date();
  
    constructor({
      name = '',
      description = '',
      id = '',
      price,
      imageUrl = '',
      
    }: {
      name?: string;
      description?: string;
      id?: string;
      price?: Price;
      imageUrl?: string;
      
    } = {}) {
      this.name = name || '';
      this.description = description || '';
      this.id = id || '';
      this.price = price;
      this.imageUrl = imageUrl || '';
     
    }
  
    static fromProduct(product: ProductModel): ProductModel {
      const  newProduct =  new ProductModel({
        id: product.id,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        name: product.name,
        
      });
      newProduct.createdAt = product.createdAt;
      return newProduct;
    }
  
    static fromJson(json: any, newId: string): ProductModel {
      const newProduct =  new ProductModel({
        id: newId,
        description: json['description'],
        price: Price.fromJson(json['price']),
        imageUrl: json['imageUrl'],
        name: json['name'],
       
      });
      newProduct.createdAt =  json['createdAt'];
      return newProduct;
    }
  
    toJson(): Record<string, any> {
      return {
        description: this.description,
        price: this.price ? this.price.toJson() : null,
        imageUrl: this.imageUrl,
        name: this.name,
        createdAt: this.createdAt,
      };
    }
  
    toString(): string {
      return JSON.stringify(this.toJson());
    }
  }
  