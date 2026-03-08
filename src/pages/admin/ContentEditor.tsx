import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useContent } from '../../hooks/useContent';
import { setDocument } from '../../services/firestore';
import SortableSectionItem from '../../components/admin/SortableSectionItem';
import PropertyEditor from '../../components/admin/PropertyEditor';
import SectionRenderer from '../../components/SectionRenderer';
import { Save, Plus, Loader2, Monitor, Smartphone, Tablet, ChevronLeft, Layout, Edit, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentEditor = () => {
  const { data: pageData, loading } = useContent('pages', 'home');
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
        setPreviewMode('mobile');
      } else {
        setIsSidebarOpen(true);
        setPreviewMode('desktop');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (pageData?.sections) {
      setSections(pageData.sections);
    }
  }, [pageData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDocument('pages', 'home', { ...pageData, sections });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = (type: string) => {
    const newSection = {
      id: `${type}-${Date.now()}`,
      type,
      data: {},
      hidden: false,
    };
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
  };

  const handleDeleteSection = (id: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter((s) => s.id !== id));
      if (selectedSectionId === id) setSelectedSectionId(null);
    }
  };

  const handleToggleVisibility = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s)));
  };

  const handleUpdateSectionData = (newData: any) => {
    setSections(sections.map((s) => (s.id === selectedSectionId ? { ...s, data: newData } : s)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar: Section List */}
      <div className={`
        w-80 bg-white border-r border-gray-200 flex flex-col z-40 shadow-xl
        ${isMobile ? 'fixed inset-y-0 left-0 transform transition-transform duration-300' : ''}
        ${isMobile && !isSidebarOpen ? '-translate-x-full' : ''}
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <h2 className="font-bold text-gray-900">Page Structure</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-sm"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </button>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  section={section}
                  isSelected={selectedSectionId === section.id}
                  onSelect={(id) => {
                    setSelectedSectionId(id);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  onDelete={handleDeleteSection}
                  onToggleVisibility={handleToggleVisibility}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="dropdown relative group">
            <button className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </button>
            <div className="hidden group-hover:block absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              {['hero', 'stats', 'about', 'practice-areas', 'cta'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    handleAddSection(type);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm capitalize flex items-center"
                >
                  <Layout className="w-4 h-4 mr-2 text-gray-400" />
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Area: Live Preview */}
      <div className="flex-1 flex flex-col bg-gray-100 relative w-full">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <span className="font-bold text-gray-700 md:hidden">Preview</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 mx-auto md:mx-0">
            <button 
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-lg transition-colors hidden md:block ${previewMode === 'desktop' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              title="Desktop View"
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-lg transition-colors hidden md:block ${previewMode === 'tablet' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              title="Tablet View"
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-lg transition-colors ${previewMode === 'mobile' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              title="Mobile View"
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-8 md:hidden"></div> {/* Spacer for centering */}
        </div>

        {/* Preview Container */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-8 bg-gray-200/50">
          <div 
            className={`
              bg-white shadow-2xl overflow-y-auto transition-all duration-300 ease-in-out border border-gray-300 rounded-lg
              ${previewMode === 'desktop' ? 'w-full h-full' : ''}
              ${previewMode === 'tablet' ? 'w-[768px] h-[90%]' : ''}
              ${previewMode === 'mobile' ? 'w-[375px] h-[90%]' : ''}
            `}
          >
            {sections.filter(s => !s.hidden).map((section) => (
              <div 
                key={section.id} 
                className={`relative group ${selectedSectionId === section.id ? 'ring-2 ring-primary ring-inset z-10' : 'hover:ring-1 hover:ring-blue-300 hover:ring-inset'}`}
                onClick={() => setSelectedSectionId(section.id)}
              >
                <SectionRenderer section={section} />
                
                {/* Hover Overlay for Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedSectionId(section.id); }}
                    className="p-1 bg-primary text-white rounded shadow-sm hover:bg-primary-dark"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            
            {sections.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Layout className="w-16 h-16 mb-4 opacity-20" />
                <p>Start adding sections to build your page</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Property Editor (Slide-over) */}
      {selectedSection && (
        <PropertyEditor 
          section={selectedSection} 
          onChange={handleUpdateSectionData}
          onClose={() => setSelectedSectionId(null)}
        />
      )}
    </div>
  );
};

export default ContentEditor;
