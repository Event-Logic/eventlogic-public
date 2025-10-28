import { CompleteSupplierResponse } from '@/types/supplier';
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Globe } from 'lucide-react';

interface SupplierOverviewProps {
  supplier: CompleteSupplierResponse;
}

export function SupplierOverview({ supplier }: SupplierOverviewProps) {
  return (
    <div className="grid gap-6">
      {/* Description */}
      {supplier.basic_info.description && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {supplier.basic_info.description}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3">
            {supplier.contact.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${supplier.contact.phone}`} className="text-blue-600 hover:underline">
                  {supplier.contact.phone}
                </a>
              </div>
            )}
            {supplier.contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${supplier.contact.email}`} className="text-blue-600 hover:underline">
                  {supplier.contact.email}
                </a>
              </div>
            )}
            {supplier.contact.final_email && supplier.contact.final_email !== supplier.contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${supplier.contact.final_email}`} className="text-blue-600 hover:underline">
                  {supplier.contact.final_email} <span className="text-xs text-gray-500">(verified)</span>
                </a>
              </div>
            )}
            {supplier.contact.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <a
                  href={supplier.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {supplier.contact.website}
                </a>
              </div>
            )}
          </div>

          {/* Social Media */}
          {(supplier.social_media.facebook ||
            supplier.social_media.instagram ||
            supplier.social_media.linkedin ||
            supplier.social_media.youtube) && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold mb-3">Social Media</h3>
              <div className="flex gap-3">
                {supplier.social_media.facebook && (
                  <a
                    href={supplier.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {supplier.social_media.instagram && (
                  <a
                    href={supplier.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-600"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {supplier.social_media.linkedin && (
                  <a
                    href={supplier.social_media.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {supplier.social_media.youtube && (
                  <a
                    href={supplier.social_media.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <div className="space-y-2">
            {supplier.location.full_address && (
              <p className="text-gray-700">{supplier.location.full_address}</p>
            )}
            {supplier.location.coordinates && (
              <p className="text-sm text-gray-500">
                {supplier.location.coordinates.lat.toFixed(6)}, {supplier.location.coordinates.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Map placeholder - can integrate Google Maps or similar */}
          {supplier.location.coordinates && (
            <div className="mt-4 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
              Map: {supplier.location.coordinates.lat.toFixed(4)}, {supplier.location.coordinates.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>

      {/* Websites */}
      {supplier.websites && supplier.websites.length > 0 && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Crawled Websites ({supplier.websites.length})</h2>
          <div className="space-y-4">
            {supplier.websites.map((website, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {website.url}
                </a>
                {website.summary && (
                  <p className="text-sm text-gray-600 mt-1">{website.summary}</p>
                )}
                {website.last_crawled && (
                  <p className="text-xs text-gray-400 mt-1">
                    Last crawled: {new Date(website.last_crawled).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Summary */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Resources Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-3xl font-bold text-blue-600">
              {supplier.resources.conference_rooms_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Conference Rooms</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-3xl font-bold text-green-600">
              {supplier.resources.restaurants_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Restaurants</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <div className="text-3xl font-bold text-purple-600">
              {supplier.resources.accommodations_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Accommodations</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded">
            <div className="text-3xl font-bold text-orange-600">
              {supplier.resources.activities_count}
            </div>
            <div className="text-sm text-gray-600 mt-1">Activities</div>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Metadata</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Created:</span>{' '}
            <span className="font-medium">
              {new Date(supplier.metadata.created_at).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Updated:</span>{' '}
            <span className="font-medium">
              {new Date(supplier.metadata.updated_at).toLocaleString()}
            </span>
          </div>
          {supplier.metadata.checked_at && (
            <>
              <div>
                <span className="text-gray-500">Checked:</span>{' '}
                <span className="font-medium">
                  {new Date(supplier.metadata.checked_at).toLocaleString()}
                </span>
              </div>
              {supplier.metadata.checked_by && (
                <div>
                  <span className="text-gray-500">Checked by:</span>{' '}
                  <span className="font-medium">{supplier.metadata.checked_by}</span>
                </div>
              )}
            </>
          )}
          {supplier.external_ids.el_supplier_id && (
            <div>
              <span className="text-gray-500">EL Supplier ID:</span>{' '}
              <span className="font-medium">{supplier.external_ids.el_supplier_id}</span>
            </div>
          )}
          {supplier.external_ids.cv_supplier_id && (
            <div>
              <span className="text-gray-500">CV Supplier ID:</span>{' '}
              <span className="font-medium">{supplier.external_ids.cv_supplier_id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
