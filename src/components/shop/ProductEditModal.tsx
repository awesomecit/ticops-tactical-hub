import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GlowButton } from '@/components/ui/GlowButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'out_of_stock';
  featured: boolean;
}

interface ProductEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

const categories = [
  { value: 'replicas', label: 'Repliche' },
  { value: 'accessories', label: 'Accessori' },
  { value: 'protection', label: 'Protezioni' },
  { value: 'clothing', label: 'Abbigliamento' },
  { value: 'ammo', label: 'Munizioni' },
  { value: 'gear', label: 'Gear Tattico' },
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  open,
  onOpenChange,
  product,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'replicas',
    status: 'draft',
    featured: false,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: 'replicas',
        status: 'draft',
        featured: false,
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price === undefined || formData.stock === undefined) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    const savedProduct: Product = {
      id: product?.id || `prod-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      category: formData.category || 'replicas',
      status: formData.stock === 0 ? 'out_of_stock' : (formData.status as 'active' | 'draft' | 'out_of_stock'),
      featured: formData.featured || false,
    };

    onSave(savedProduct);
    onOpenChange(false);
    toast.success(product ? 'Prodotto aggiornato' : 'Prodotto creato');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase">
            {product ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
          </DialogTitle>
          <DialogDescription>
            {product ? 'Modifica i dettagli del prodotto' : 'Aggiungi un nuovo prodotto al catalogo'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Prodotto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Es. Replica M4A1 Full Metal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrivi il prodotto..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prezzo (€) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Quantità *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Stato</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'draft' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Bozza</SelectItem>
                <SelectItem value="active">Attivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="featured">Prodotto in evidenza</Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <GlowButton
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </GlowButton>
            <GlowButton type="submit" variant="primary" className="flex-1">
              {product ? 'Salva' : 'Crea'}
            </GlowButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
