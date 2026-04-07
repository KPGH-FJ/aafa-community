'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = '封面图片' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 验证文件大小 (最大 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    setUploading(true);

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        alert('请先登录');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/upload/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // 构建完整 URL
        const fullUrl = `${apiUrl.replace('/api/v1', '')}${data.data.url}`;
        onChange(fullUrl);
        setPreview(fullUrl);
      } else {
        alert(data.error || '上传失败');
      }
    } catch (error) {
      console.error('上传错误:', error);
      alert('上传失败，请稍后重试');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#5C5852] mb-2">
        {label}
      </label>
      
      {/* 预览区域 */}
      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="预览"
            className="w-full h-48 object-cover rounded-lg border border-[#E5E2DE]"
          />
        </div>
      )}

      <div className="flex gap-2">
        {/* URL 输入 */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          className="flex-1 px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
          placeholder="图片 URL 或上传图片"
        />
        
        {/* 上传按钮 */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-[#C9A89A] text-white rounded-lg hover:bg-[#B89789] transition-colors disabled:opacity-50"
        >
          {uploading ? '上传中...' : '上传'}
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="text-xs text-[#A8A49D] mt-1">
        支持 JPG、PNG、GIF，最大 5MB
      </p>
    </div>
  );
}
