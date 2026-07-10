"use client";

import { useEducationForm } from "../hooks/useEducationForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useState, useRef, useEffect } from "react";

interface EducationFormFeatureProps {
  readonly articleId?: string;
}

export function EducationFormFeature({ articleId }: EducationFormFeatureProps) {
  const {
    fields,
    isLoading,
    isSaving,
    errors,
    handleChange,
    save,
    cancel,
  } = useEducationForm(articleId);

  // Combobox category states
  const [categoriesList, setCategoriesList] = useState<string[]>([
    "Diet & Nutrisi",
    "Aktivitas Fisik",
    "Manajemen Obat",
    "Kesehatan Mental",
  ]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // YouTube modal states
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [youtubeUrlInput, setYoutubeUrlInput] = useState("");

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryDropdownOpen(false);
        setIsAddingNewCategory(false);
        setCategorySearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle mock thumbnail selection
  const triggerMockUpload = () => {
    const mockThumb = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpin8nNCmgtE7rRHhBIl8gQirLli7cW3WJP-L6RpCB1cPWmi1O_ZqLsmIFLRIktv-eVNj6I3XVFbN5iFpt1BtMYj0Ui-y-8zoxUH8RNv1yHD62jBGUPlpez5zBgIwsZPCgfohPYTNRBBb4_fpY1nwe6zfmQmYydGiWXop-XsxR940f25fhUOvkmUL-onyXINB8pfQBIw66phznnlJcwCKq6WOP4-yQs2_xSGOJnutWO-R-86pzTF04Ha9hUAQF_-hkrWuU08JFE3G8";
    handleChange("thumbnail", mockThumb);
  };

  // Helper to use clinical template
  const applyClinicalTemplate = () => {
    const template = `### Cara Mengukur Gula Darah\n\nCuci tangan sebelum menggunakan glukometer. Pastikan tangan benar-benar kering sebelum menyentuh strip tes untuk menghindari kontaminasi atau hasil yang tidak akurat.\n\nLangkah-langkah:\n1. Siapkan alat (glukometer, strip, lancet)\n2. Bersihkan jari dengan alkohol swab\n3. Gunakan strip pada glukometer\n\n[Info Penting: Pemeriksaan sebaiknya dilakukan sebelum sarapan untuk hasil baseline yang paling akurat.]`;
    handleChange("content", template);
    handleChange("duration", 5);
  };

  // Helper to append formatting snippets
  const appendSnippet = (type: "judul" | "paragraf" | "langkah" | "info") => {
    let snippet = "";
    if (type === "judul") {
      snippet = "\n\n### Judul Bagian Baru\n";
    } else if (type === "paragraf") {
      snippet = "\n\nParagraf penjelasan materi baru di sini...\n";
    } else if (type === "langkah") {
      snippet = "\n\nLangkah-langkah:\n1. Langkah pertama\n2. Langkah kedua\n3. Langkah ketiga\n";
    } else if (type === "info") {
      snippet = "\n\n[Info Penting: Catatan informasi klinis penting di sini...]\n";
    }
    handleChange("content", fields.content + snippet);
  };

  // Insert mock uploaded image inside editor
  const handleInsertMockImage = () => {
    const mockImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDMQYfz7rV6EhsE2sj7_zb9EH39viduL03wF_Kb3E8gay8BzbDvsdnNbSUgf87atScN8VloDV1vnL6uRhzjSCQiMZcqQwxNpHPuFs9Ofk_yYpwlVWrFid3BPfl7hn09w2eGTPl0AG2CTN4L1t0KjwCgfrA7G0YkrYjMu9odi2vge_V9R2yE7ylUl2skr2cxjNXt5dAi0fSaHw5wc56KcXaPNPngnTU4qIxnWvFQMTOpeqTPAzio03GUUtNqnf0biE6zwb2rF8sn6p8A";
    handleChange("content", fields.content + `\n\n[Gambar: ${mockImgUrl}]\n`);
  };

  // Insert YouTube video from modal
  const handleInsertYoutube = () => {
    if (youtubeUrlInput.trim()) {
      handleChange("content", fields.content + `\n\n[YouTube: ${youtubeUrlInput}]\n`);
      handleChange("youtubeLink", youtubeUrlInput);
      setIsYoutubeModalOpen(false);
      setYoutubeUrlInput("");
    }
  };

  // Add custom new category dynamically in combobox
  const handleAddNewCategory = () => {
    if (newCategoryInput.trim() && !categoriesList.includes(newCategoryInput.trim())) {
      const added = newCategoryInput.trim();
      setCategoriesList((prev) => [...prev, added]);
      handleChange("category", added);
      setNewCategoryInput("");
      setIsAddingNewCategory(false);
      setIsCategoryDropdownOpen(false);
      setCategorySearchQuery("");
    }
  };

  const filteredCategories = categoriesList.filter((c) =>
    c.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const characterCount = fields.content.length;

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] relative">
      
      {/* YouTube insertion modal */}
      {isYoutubeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-[#E2E8F0] space-y-4 font-[family-name:var(--font-poppins)] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]/80">
              <h4 className="font-bold text-base text-[#1E293B]">
                Sisipkan Video YouTube
              </h4>
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(false)}
                className="text-[#64748B] hover:text-[#1E293B] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Tautan/Link Video YouTube
              </label>
              <input
                type="text"
                value={youtubeUrlInput}
                onChange={(e) => setYoutubeUrlInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none text-sm font-medium text-[#1E293B]"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsYoutubeModalOpen(false);
                  setYoutubeUrlInput("");
                }}
                className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleInsertYoutube}
                className="px-6 py-2.5 bg-[#00695C] text-white rounded-xl text-xs font-bold shadow-md shadow-[#00695C]/10 cursor-pointer hover:opacity-90 transition-all"
              >
                Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-[#1E293B] tracking-tight font-[family-name:var(--font-poppins)]">
            {articleId ? "Edit Materi Edukasi" : "Tambah Materi Edukasi"}
          </h2>
          <p className="text-[#64748B] text-sm mt-1 font-[family-name:var(--font-poppins)]">
            Lengkapi informasi materi edukasi pasien diabetes.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => save("Draf")}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full border border-[#E2E8F0] text-[#1E293B] text-sm font-semibold hover:bg-[#F1F5F9] transition-all cursor-pointer disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => save("Diterbitkan")}
            disabled={isSaving}
            className="px-8 py-2.5 rounded-full bg-[#00695C] text-white text-sm font-semibold shadow-lg shadow-[#00695C]/20 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
          >
            Publikasikan
          </button>
        </div>
      </div>

      {/* Form Cards Stack */}
      <div className="space-y-8">
        
        {/* Card 1: Informasi Dasar */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm space-y-6">
          
          {/* Title input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
              Judul Edukasi
            </label>
            <input
              type="text"
              value={fields.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={[
                "w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all text-sm placeholder:text-[#64748B]/50 font-medium font-[family-name:var(--font-poppins)]",
                errors.title ? "border-red-500" : "",
              ].join(" ")}
              placeholder="Masukkan judul materi edukasi..."
            />
            {errors.title && (
              <p className="text-red-500 text-xs font-semibold font-[family-name:var(--font-poppins)]">
                {errors.title}
              </p>
            )}
          </div>

          {/* Category & Read time input row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Searchable Combobox Category */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
                Kategori
              </label>
              
              {/* Dropdown trigger pill */}
              <div
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] outline-none flex justify-between items-center cursor-pointer bg-white text-sm font-semibold text-[#1E293B]"
              >
                <span>{fields.category || "Pilih Kategori"}</span>
                <span className="material-symbols-outlined text-[#64748B] select-none">expand_more</span>
              </div>

              {/* Combobox active panel list */}
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 right-0 top-[76px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-40 max-h-[300px] overflow-hidden flex flex-col">
                  {/* Searchbox inside select dropdown */}
                  <div className="p-2 border-b border-[#E2E8F0] bg-[#F8F9FA] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#64748B] text-sm select-none">search</span>
                    <input
                      type="text"
                      placeholder="Cari kategori..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-[#1E293B] font-medium"
                    />
                  </div>

                  {/* List items */}
                  <div className="overflow-y-auto flex-1 py-1">
                    {filteredCategories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => {
                          handleChange("category", cat);
                          setIsCategoryDropdownOpen(false);
                          setCategorySearchQuery("");
                        }}
                        className={[
                          "px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between",
                          fields.category === cat
                            ? "bg-[#F0F9F8] text-[#00695C]"
                            : "text-[#1E293B] hover:bg-[#F1F5F9]",
                        ].join(" ")}
                      >
                        <span>{cat}</span>
                        {fields.category === cat && (
                          <span className="material-symbols-outlined text-[#00695C] text-sm select-none">check</span>
                        )}
                      </div>
                    ))}
                    {filteredCategories.length === 0 && !isAddingNewCategory && (
                      <p className="text-xs text-[#64748B] text-center py-3">Tidak ditemukan</p>
                    )}
                  </div>

                  {/* Add Kategori trigger options */}
                  <div className="border-t border-[#E2E8F0] p-2 bg-[#F8F9FA]">
                    {isAddingNewCategory ? (
                      <div className="flex gap-1.5 items-center w-full">
                        <input
                          type="text"
                          value={newCategoryInput}
                          onChange={(e) => setNewCategoryInput(e.target.value)}
                          placeholder="Kategori baru..."
                          className="flex-1 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-xs outline-none bg-white font-medium"
                        />
                        <button
                          type="button"
                          onClick={handleAddNewCategory}
                          className="bg-[#00695C] text-white p-1.5 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90"
                        >
                          <span className="material-symbols-outlined text-xs select-none">check</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingNewCategory(false);
                            setNewCategoryInput("");
                          }}
                          className="bg-gray-200 text-gray-500 p-1.5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300"
                        >
                          <span className="material-symbols-outlined text-xs select-none">close</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingNewCategory(true)}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-[#00695C] hover:bg-[#F0F9F8] rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm select-none">add</span>
                        <span>Tambah Kategori Baru</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Read time duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
                Estimasi Membaca (Menit)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={fields.duration || ""}
                  onChange={(e) => handleChange("duration", parseInt(e.target.value) || 0)}
                  className={[
                    "w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none text-sm font-semibold font-[family-name:var(--font-poppins)] text-[#1E293B]",
                    errors.duration ? "border-red-500" : "",
                  ].join(" ")}
                  placeholder="Contoh: 5"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] opacity-40 select-none">
                  timer
                </span>
              </div>
              {errors.duration && (
                <p className="text-red-500 text-xs font-semibold font-[family-name:var(--font-poppins)]">
                  {errors.duration}
                </p>
              )}
            </div>

          </div>

          {/* Banner Upload Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
              Banner Materi
            </label>

            {fields.thumbnail ? (
              <div className="relative group rounded-xl overflow-hidden border border-[#E2E8F0] aspect-video bg-[#F1F5F9] max-w-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fields.thumbnail}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleChange("thumbnail", "")}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-red-50"
                  >
                    Hapus Banner
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={triggerMockUpload}
                className="border-2 border-dashed border-[#E2E8F0] hover:border-[#00695C] rounded-xl p-12 flex flex-col items-center justify-center bg-[#F1F5F9]/30 hover:bg-[#F1F5F9]/60 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-[#00695C] text-2xl select-none">add_a_photo</span>
                </div>
                <p className="text-sm text-[#1E293B] font-semibold font-[family-name:var(--font-poppins)]">
                  Klik atau seret file banner ke sini
                </p>
                <p className="text-[11px] text-[#64748B] mt-1 font-[family-name:var(--font-poppins)]">
                  Format PNG, JPG (Maks. 5MB, Rekomendasi 16:9)
                </p>
              </div>
            )}
            {errors.thumbnail && (
              <p className="text-red-500 text-xs font-semibold font-[family-name:var(--font-poppins)]">
                {errors.thumbnail}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
              Ringkasan Singkat
            </label>
            <textarea
              value={fields.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value.slice(0, 250))}
              className={[
                "w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all text-sm resize-none font-medium font-[family-name:var(--font-poppins)] text-[#1E293B] placeholder:text-[#64748B]/50",
                errors.shortDescription ? "border-red-500" : "",
              ].join(" ")}
              placeholder="Deskripsi singkat untuk kartu materi..."
              rows={3}
            />
            <div className="flex justify-between items-center text-[10px] font-semibold font-[family-name:var(--font-poppins)] text-[#64748B]">
              <span>
                {errors.shortDescription && (
                  <span className="text-red-500">{errors.shortDescription}</span>
                )}
              </span>
              <span>{fields.shortDescription.length} / 250 Karakter</span>
            </div>
          </div>

        </div>

        {/* Card 2: Editor (Isi Konten Edukasi) */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          
          <div className="border-b border-[#E2E8F0] px-8 py-5 flex items-center justify-between bg-[#F1F5F9]/10">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-[family-name:var(--font-poppins)]">
              Isi Konten Edukasi
            </label>
            <button
              type="button"
              onClick={applyClinicalTemplate}
              className="flex items-center gap-2 text-xs font-bold text-[#00695C] hover:bg-[#00695C]/5 px-4 py-2 rounded-lg transition-all cursor-pointer font-[family-name:var(--font-poppins)]"
            >
              <span className="material-symbols-outlined text-sm select-none">magic_button</span>
              <span>Gunakan Template Klinis</span>
            </button>
          </div>

          <div className="p-8 space-y-6">
            
            {/* Editor Toolbar with Youtube integration */}
            <div className="flex flex-wrap gap-2 p-2 bg-[#F1F5F9]/50 rounded-xl">
              <button
                type="button"
                onClick={() => appendSnippet("judul")}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">title</span>
                <span>Judul</span>
              </button>
              <button
                type="button"
                onClick={() => appendSnippet("paragraf")}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">format_align_left</span>
                <span>Paragraf</span>
              </button>
              <button
                type="button"
                onClick={() => appendSnippet("langkah")}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">format_list_bulleted</span>
                <span>Langkah</span>
              </button>
              <button
                type="button"
                onClick={() => appendSnippet("info")}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">warning</span>
                <span>Info Penting</span>
              </button>
              <button
                type="button"
                onClick={handleInsertMockImage}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">image</span>
                <span>Gambar</span>
              </button>
              {/* Rich text Toolbar extension: youtube */}
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:text-[#00695C] hover:border-[#00695C] transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm select-none">smart_display</span>
                <span>YouTube</span>
              </button>
            </div>

            {/* Editor Canvas Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              
              {/* Textarea inputs */}
              <div className="lg:col-span-2 space-y-2">
                <textarea
                  value={fields.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  className={[
                    "w-full min-h-[500px] h-full border border-[#E2E8F0] rounded-xl p-8 outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all text-sm leading-relaxed font-medium font-[family-name:var(--font-poppins)] text-[#1E293B] placeholder:text-[#64748B]/50 editor-container resize-none",
                    errors.content ? "border-red-500" : "",
                  ].join(" ")}
                  placeholder="Tulis atau gunakan template klinis untuk menyusun materi edukasi..."
                />
                {errors.content && (
                  <p className="text-red-500 text-xs font-semibold font-[family-name:var(--font-poppins)]">
                    {errors.content}
                  </p>
                )}
              </div>

              {/* Drag & Drop Media Upload Container inside editor */}
              <div className="border-2 border-dashed border-[#E2E8F0] hover:border-[#00695C] rounded-xl p-10 flex flex-col items-center justify-center bg-[#F1F5F9]/30 hover:bg-[#F1F5F9]/60 transition-all cursor-pointer group select-none min-h-[250px]" onClick={handleInsertMockImage}>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-[#00695C] text-xl select-none">add_a_photo</span>
                </div>
                <p className="text-xs font-semibold text-[#1E293B] font-[family-name:var(--font-poppins)] text-center">
                  Drag & Drop File atau Pilih Gambar
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5 font-[family-name:var(--font-poppins)] text-center">
                  Format PNG, JPG (Maks. 2MB)
                </p>
              </div>

            </div>

            {/* Footer Meta */}
            <div className="mt-4 flex items-center justify-between px-2 text-[11px] text-[#64748B] font-medium font-[family-name:var(--font-poppins)] border-t border-[#E2E8F0]/50 pt-4">
              <div className="flex gap-6">
                <span>
                  Karakter: <b className="text-[#1E293B]">{characterCount}</b>
                </span>
                <span>
                  Estimasi baca: <b className="text-[#1E293B]">{fields.duration || 0} Menit</b>
                </span>
              </div>
              <span className="uppercase tracking-widest text-[#00695C] font-bold">
                Status: {fields.status}
              </span>
            </div>

          </div>

        </div>

        {/* Card 3: Publication Settings */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#1E293B] font-[family-name:var(--font-poppins)]">
              Status Publikasi
            </h4>
            <p className="text-xs text-[#64748B] mt-1 font-[family-name:var(--font-poppins)]">
              Atur visibilitas konten untuk aplikasi pasien.
            </p>
          </div>

          <div className="flex bg-[#F1F5F9] p-1.5 rounded-full border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => handleChange("status", "Draf")}
              className={[
                "px-8 py-2 rounded-full text-xs font-bold transition-all cursor-pointer",
                fields.status === "Draf"
                  ? "bg-white shadow-sm text-[#00695C]"
                  : "text-[#64748B] hover:text-[#1E293B]",
              ].join(" ")}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => handleChange("status", "Diterbitkan")}
              className={[
                "px-8 py-2 rounded-full text-xs font-bold transition-all cursor-pointer",
                fields.status === "Diterbitkan"
                  ? "bg-white shadow-sm text-[#00695C]"
                  : "text-[#64748B] hover:text-[#1E293B]",
              ].join(" ")}
            >
              Publikasikan
            </button>
          </div>
        </div>

        {/* Global Actions Footer */}
        <div className="flex justify-end gap-4 py-8 border-t border-[#E2E8F0]/40">
          <button
            onClick={cancel}
            className="px-8 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] text-sm font-bold hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={() => save()}
            disabled={isSaving}
            className="px-10 py-3 rounded-xl bg-[#00695C] text-white text-sm font-bold shadow-xl shadow-[#00695C]/25 hover:opacity-90 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg select-none">send</span>
            <span>{articleId ? "Simpan Perubahan" : "Publikasikan Sekarang"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
