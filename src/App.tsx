import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, ShoppingCart } from 'lucide-react';

interface CostInputs {
  productCost: number;
  operationalCosts: number;
  taxPercentage: number;
  desiredProfitMargin: number;
}

function App() {
  const [costs, setCosts] = useState<CostInputs>({
    productCost: 0,
    operationalCosts: 0,
    taxPercentage: 0,
    desiredProfitMargin: 20,
  });

  const calculateSellingPrice = () => {
    const totalCost = costs.productCost + costs.operationalCosts;
    const taxAmount = (totalCost * costs.taxPercentage) / 100;
    const profitAmount = (totalCost * costs.desiredProfitMargin) / 100;
    return totalCost + taxAmount + profitAmount;
  };

  const handleInputChange = (field: keyof CostInputs, value: string) => {
    setCosts(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const sellingPrice = calculateSellingPrice();
  const profitAmount = (costs.productCost + costs.operationalCosts) * (costs.desiredProfitMargin / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Calculadora de Preços</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Custos do Produto</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custo do Produto (R$)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={costs.productCost || ''}
                      onChange={(e) => handleInputChange('productCost', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custos Operacionais (R$)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={costs.operationalCosts || ''}
                      onChange={(e) => handleInputChange('operationalCosts', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impostos (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={costs.taxPercentage || ''}
                      onChange={(e) => handleInputChange('taxPercentage', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Margem de Lucro Desejada (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={costs.desiredProfitMargin || ''}
                      onChange={(e) => handleInputChange('desiredProfitMargin', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-indigo-600" />
                Resultado
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600">Preço de Venda Sugerido</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    R$ {sellingPrice.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600">Lucro Estimado</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {profitAmount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Detalhamento:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Custo do Produto:</span>
                      <span>R$ {costs.productCost.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Custos Operacionais:</span>
                      <span>R$ {costs.operationalCosts.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Impostos:</span>
                      <span>{costs.taxPercentage}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Margem de Lucro:</span>
                      <span>{costs.desiredProfitMargin}%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;