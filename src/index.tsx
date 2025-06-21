import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './services/root/store';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		{/* <BrowserRouter> */}
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
		{/* </BrowserRouter> */}
	</StrictMode>
);
