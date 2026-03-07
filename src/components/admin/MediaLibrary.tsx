import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadToCloudinary } from '../../services/cloudinary';
import { addDocument, deleteDocument } from '../../services/firestore';
import { useContent } from '../../hooks/useContent';
import { Trash2, Upload, Loader2, Image as ImageIcon, Search, Check } from 'lucide-react';

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  selectable?: boolean;
}

const MediaLibrary = ({ onSelect, selectable = false }: MediaLibraryProps) => {
  const { data: media, loading } = useContent('media');
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    setUploading(true);
    (async () => {
      try {
        for (const file of acceptedFiles) {
          const url = await uploadToCloudinary(file);
          await addDocument('media', {
            url,
            name: file.name,
            type: file.type,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload media.');
      } finally {
        setUploading(false);
      }
    })();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop } as any);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this media item?')) {
      try {
        await deleteDocument('media', id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete media.');
      }
    }
  };

  const filteredMedia = media?.filter((item: any) => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        {!selectable && (
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              Upload Media
            </button>
          </div>
        )}
      </div>

      {/* Upload Area (only visible if not selectable or if explicitly wanted, but button above handles it) */}
      {/* We can keep the dropzone active on the whole area or just the button. Let's keep it simple for now. */}

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto p-1">
        {filteredMedia?.map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => selectable && onSelect && onSelect(item.url)}
            className={`group relative bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectable ? 'hover:ring-2 hover:ring-primary' : ''}`}
          >
            <div className="aspect-square bg-gray-100 relative">
              {item.type?.startsWith('image/') ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!selectable && (
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                {selectable && (
                  <div className="p-2 bg-primary rounded-full text-white">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs font-medium text-gray-900 truncate" title={item.name}>
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
