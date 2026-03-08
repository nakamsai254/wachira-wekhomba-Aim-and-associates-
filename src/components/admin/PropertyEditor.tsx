import React, { useState, useEffect } from 'react';
import ImagePicker from './ImagePicker';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface PropertyEditorProps {
  section: any;
  onChange: (newData: any) => void;
  onClose: () => void;
}

const PropertyEditor = ({ section, onChange, onClose }: PropertyEditorProps) => {
  const [data, setData] = useState(section.data || {});

  useEffect(() => {
    setData(section.data || {});
  }, [section]);

  const handleChange = (key: string, value: any) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    onChange(newData);
  };

  const renderField = (key: string, value: any, type: string = 'text', label?: string) => {
    switch (type) {
      case 'textarea':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label || key}</label>
            <textarea
              value={value || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        );
      case 'image':
        return (
          <div className="mb-4">
            <ImagePicker
              label={label || key}
              value={value || ''}
              onChange={(url) => handleChange(key, url)}
            />
          </div>
        );
      case 'number':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label || key}</label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        );
      default:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label || key}</label>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        );
    }
  };

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return (
          <>
            {renderField('tagline', data.tagline)}
            {renderField('title', data.title)}
            {renderField('subtitle', data.subtitle, 'textarea')}
            {renderField('backgroundImage', data.backgroundImage, 'image', 'Background Image')}
          </>
        );
      case 'stats':
        return (
          <div className="space-y-4">
             <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mb-4">
                Manage the statistics displayed on the home page.
             </div>
             {(data.stats || []).map((stat: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                   <button 
                      onClick={() => {
                         const newStats = [...(data.stats || [])];
                         newStats.splice(index, 1);
                         handleChange('stats', newStats);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                   >
                      <Trash2 className="w-4 h-4" />
                   </button>
                   <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                         <label className="block text-xs font-medium text-gray-500">Value</label>
                         <input 
                            type="number" 
                            value={stat.end} 
                            onChange={(e) => {
                               const newStats = [...(data.stats || [])];
                               newStats[index] = { ...stat, end: parseInt(e.target.value) };
                               handleChange('stats', newStats);
                            }}
                            className="w-full px-2 py-1 border rounded text-sm"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-medium text-gray-500">Suffix</label>
                         <input 
                            type="text" 
                            value={stat.suffix || ''} 
                            onChange={(e) => {
                               const newStats = [...(data.stats || [])];
                               newStats[index] = { ...stat, suffix: e.target.value };
                               handleChange('stats', newStats);
                            }}
                            className="w-full px-2 py-1 border rounded text-sm"
                         />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-500">Label</label>
                      <input 
                         type="text" 
                         value={stat.label} 
                         onChange={(e) => {
                            const newStats = [...(data.stats || [])];
                            newStats[index] = { ...stat, label: e.target.value };
                            handleChange('stats', newStats);
                         }}
                         className="w-full px-2 py-1 border rounded text-sm"
                      />
                   </div>
                </div>
             ))}
             <button 
                onClick={() => {
                   const newStats = [...(data.stats || []), { end: 0, suffix: '+', label: 'New Stat' }];
                   handleChange('stats', newStats);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center text-sm"
             >
                <Plus className="w-4 h-4 mr-2" /> Add Stat
             </button>
          </div>
        );
      case 'about':
        return (
          <>
            {renderField('title', data.title)}
            {renderField('description1', data.description1, 'textarea', 'Paragraph 1')}
            {renderField('description2', data.description2, 'textarea', 'Paragraph 2')}
            {renderField('image', data.image, 'image', 'Section Image')}
          </>
        );
      case 'practice-areas':
        return (
          <div className="space-y-4">
             <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mb-4">
                Manage the practice areas highlights. Icons are currently fixed.
             </div>
             {(data.areas || []).map((area: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                   <button 
                      onClick={() => {
                         const newAreas = [...(data.areas || [])];
                         newAreas.splice(index, 1);
                         handleChange('areas', newAreas);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                   >
                      <Trash2 className="w-4 h-4" />
                   </button>
                   <div className="mb-2">
                      <label className="block text-xs font-medium text-gray-500">Icon</label>
                      <select
                         value={area.icon || 'briefcase'}
                         onChange={(e) => {
                            const newAreas = [...(data.areas || [])];
                            newAreas[index] = { ...area, icon: e.target.value };
                            handleChange('areas', newAreas);
                         }}
                         className="w-full px-2 py-1 border rounded text-sm bg-white"
                      >
                         <option value="briefcase">Briefcase</option>
                         <option value="gavel">Gavel</option>
                         <option value="map-pin">Map Pin</option>
                         <option value="users">Users</option>
                         <option value="scale">Scale</option>
                         <option value="shield">Shield</option>
                         <option value="file-text">File Text</option>
                         <option value="globe">Globe</option>
                         <option value="award">Award</option>
                      </select>
                   </div>
                   <div className="mb-2">
                      <label className="block text-xs font-medium text-gray-500">Title</label>
                      <input 
                         type="text" 
                         value={area.title} 
                         onChange={(e) => {
                            const newAreas = [...(data.areas || [])];
                            newAreas[index] = { ...area, title: e.target.value };
                            handleChange('areas', newAreas);
                         }}
                         className="w-full px-2 py-1 border rounded text-sm"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-500">Description</label>
                      <textarea 
                         rows={2}
                         value={area.desc} 
                         onChange={(e) => {
                            const newAreas = [...(data.areas || [])];
                            newAreas[index] = { ...area, desc: e.target.value };
                            handleChange('areas', newAreas);
                         }}
                         className="w-full px-2 py-1 border rounded text-sm"
                      />
                   </div>
                   <div className="mt-2">
                      <label className="block text-xs font-medium text-gray-500">Detailed Content (for Learn More page)</label>
                      <textarea 
                         rows={4}
                         value={area.details || ''} 
                         onChange={(e) => {
                            const newAreas = [...(data.areas || [])];
                            newAreas[index] = { ...area, details: e.target.value };
                            handleChange('areas', newAreas);
                         }}
                         className="w-full px-2 py-1 border rounded text-sm"
                         placeholder="Enter detailed information about this service..."
                      />
                   </div>
                </div>
             ))}
             <button 
                onClick={() => {
                   const newAreas = [...(data.areas || []), { title: 'New Area', desc: 'Description here...', details: '', icon: 'briefcase' }];
                   handleChange('areas', newAreas);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary flex items-center justify-center text-sm"
             >
                <Plus className="w-4 h-4 mr-2" /> Add Practice Area
             </button>
          </div>
        );
      case 'cta':
        return (
          <>
            {renderField('title', data.title)}
            {renderField('description', data.description, 'textarea')}
          </>
        );
      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            Unknown section type: {section.type}
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-xl w-full md:w-80 fixed right-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold text-gray-900 capitalize">{section.type.replace('-', ' ')} Settings</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {renderFields()}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center shadow-sm"
        >
          <Save className="w-4 h-4 mr-2" />
          Done
        </button>
      </div>
    </div>
  );
};

export default PropertyEditor;
