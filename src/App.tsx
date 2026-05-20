import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ResourceHubView from './components/ResourceHubView';
import AssistantView from './components/AssistantView';
import DraftingView from './components/DraftingView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [resourceCategoryFilter, setResourceCategoryFilter] = useState<string>('All');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            setResourceCategoryFilter={setResourceCategoryFilter} 
          />
        );
      case 'resources':
        return (
          <ResourceHubView 
            initialCategoryFilter={resourceCategoryFilter}
            onClearFilter={() => setResourceCategoryFilter('All')} 
          />
        );
      case 'assistant':
        return <AssistantView />;
      case 'drafting':
        return <DraftingView />;
      default:
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            setResourceCategoryFilter={setResourceCategoryFilter} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] flex flex-col font-sans transition-colors duration-200">
      {/* Structural Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Route Render View Container */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Structural Footer */}
      <Footer />
    </div>
  );
}
