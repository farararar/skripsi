import React from 'react';
import Router from './Router';
import { Provider as AuthProvider } from './services/Context/AuthContext'
import { Provider as CustomerProvider } from './services/Context/CustomerContext'
import { Provider as AccountProvider } from './services/Context/AccountContext'
import { Provider as IncomeProvider } from './services/Context/IncomeContext'
import { Provider as LedgerProvider } from './services/Context/LedgerContext'
import { Provider as OutcomeProvider } from './services/Context/OutcomeContext'
import { Provider as JournalProvider } from './services/Context/JournalContext'
import { Provider as MaterialCategoryProvider } from './services/Context/MaterialCategoryContext'
import { Provider as RawMaterialProvider } from './services/Context/RawMaterialContext'
import { Provider as ProductProvider } from './services/Context/ProductContext'
import { Provider as StockOpnameProvider } from './services/Context/StockOpnameContext'

const App = () => {
  return (
    <AuthProvider>
      <CustomerProvider>
        <IncomeProvider>
          <AccountProvider>
            <LedgerProvider>
              <OutcomeProvider>
                <JournalProvider>
                  <MaterialCategoryProvider>
                    <RawMaterialProvider>
                      <ProductProvider>
                        <StockOpnameProvider>
                          <Router />
                        </StockOpnameProvider>
                      </ProductProvider>
                    </RawMaterialProvider>
                  </MaterialCategoryProvider>
                </JournalProvider>
              </OutcomeProvider>
            </LedgerProvider>
          </AccountProvider>
        </IncomeProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
