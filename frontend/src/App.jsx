import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import {DepositMoney} from "./pages/DepositMoney"
import { TransactionHistory } from "./pages/TransactionHistory";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/deposit" element={<DepositMoney/>} />
          <Route path="/transactions" element={<TransactionHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
